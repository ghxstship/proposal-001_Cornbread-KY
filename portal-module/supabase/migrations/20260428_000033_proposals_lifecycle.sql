-- fbw_033 · Proposals Lifecycle Execution Layer.
-- Extends the existing proposals platform with the post-approval execution layer:
-- phases, gate items, line items, change orders, revision rounds, approvals,
-- files, and activity log. All client-portal surfaces read from these tables.
--
-- Foreign keys: proposals(id) (existing), orgs(id), users(id).
-- RLS: org-scoped via is_org_member(); writes gated app-side via withAuth() +
-- assertCapability. Client signature actions go through service-role server
-- actions in src/app/(portal)/p/[slug]/proposals/[proposalId]/**/actions.ts.

-- ─── Enums ───────────────────────────────────────────────────────────────
do $$ begin
  create type proposal_phase_state as enum (
    'locked',          -- Earlier phase not yet complete
    'active',          -- Currently executing
    'gate_pending',    -- Awaiting gate sign-off to advance
    'complete'         -- Gate satisfied, phase closed
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type proposal_phase_pricing as enum ('complimentary', 'priced', 'monthly');
exception when duplicate_object then null; end $$;

do $$ begin
  create type proposal_change_order_state as enum (
    'draft',
    'submitted',
    'client_approved',
    'client_rejected',
    'countered',
    'void'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type proposal_revision_state as enum (
    'open',
    'in_review',
    'changes_requested',
    'approved',
    'cancelled'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type proposal_revision_asset_kind as enum ('image', 'pdf', 'video', 'file', 'link');
exception when duplicate_object then null; end $$;

do $$ begin
  create type proposal_approval_kind as enum (
    'gate',
    'sow',
    'invoice',
    'change_order',
    'revision',
    'deliverable',
    'general'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type proposal_approval_state as enum ('pending', 'approved', 'rejected', 'cancelled');
exception when duplicate_object then null; end $$;

do $$ begin
  create type proposal_file_kind as enum (
    'sow',
    'invoice',
    'condition_report',
    'proof',
    'deliverable',
    'inventory',
    'photograph',
    'misc'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type proposal_activity_kind as enum (
    'phase_started',
    'phase_completed',
    'gate_item_checked',
    'gate_item_unchecked',
    'change_order_submitted',
    'change_order_approved',
    'change_order_rejected',
    'revision_opened',
    'revision_commented',
    'revision_resolved',
    'approval_requested',
    'approval_signed',
    'approval_rejected',
    'file_uploaded',
    'file_deleted',
    'note'
  );
exception when duplicate_object then null; end $$;

-- ─── Phases ──────────────────────────────────────────────────────────────
create table if not exists proposal_phases (
  id            uuid primary key default gen_random_uuid(),
  org_id        uuid not null references orgs(id) on delete cascade,
  proposal_id   uuid not null references proposals(id) on delete cascade,
  position      int not null,
  num           text not null,
  name          text not null,
  tag           text,
  pricing       proposal_phase_pricing not null default 'priced',
  accent        text,
  narrative     text,
  state         proposal_phase_state not null default 'locked',
  unlocks_label text,
  started_at    timestamptz,
  completed_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique (proposal_id, position)
);
create index proposal_phases_proposal_idx on proposal_phases(proposal_id, position);
create index proposal_phases_state_idx on proposal_phases(proposal_id, state);
alter table proposal_phases enable row level security;
create policy proposal_phases_select on proposal_phases for select to authenticated using (is_org_member(org_id));
create policy proposal_phases_insert on proposal_phases for insert to authenticated with check (has_org_role(org_id, array['owner','admin','controller','collaborator']));
create policy proposal_phases_update on proposal_phases for update to authenticated using (is_org_member(org_id)) with check (is_org_member(org_id));
create policy proposal_phases_delete on proposal_phases for delete to authenticated using (has_org_role(org_id, array['owner','admin']));
create trigger proposal_phases_touch_updated_at before update on proposal_phases for each row execute function touch_updated_at();

-- ─── Phase line items ────────────────────────────────────────────────────
create table if not exists proposal_phase_line_items (
  id              uuid primary key default gen_random_uuid(),
  org_id          uuid not null references orgs(id) on delete cascade,
  phase_id        uuid not null references proposal_phases(id) on delete cascade,
  position        int not null,
  name            text not null,
  description     text,
  qty_label       text,
  rate_label      text,
  subtotal_cents  bigint not null default 0,
  is_optional     boolean not null default false,
  note            text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index proposal_phase_line_items_phase_idx on proposal_phase_line_items(phase_id, position);
alter table proposal_phase_line_items enable row level security;
create policy proposal_phase_line_items_select on proposal_phase_line_items for select to authenticated using (is_org_member(org_id));
create policy proposal_phase_line_items_write on proposal_phase_line_items for all to authenticated using (has_org_role(org_id, array['owner','admin','controller','collaborator'])) with check (has_org_role(org_id, array['owner','admin','controller','collaborator']));
create trigger proposal_phase_line_items_touch_updated_at before update on proposal_phase_line_items for each row execute function touch_updated_at();

-- ─── Phase gate items (the milestone checklist) ──────────────────────────
create table if not exists proposal_phase_gate_items (
  id            uuid primary key default gen_random_uuid(),
  org_id        uuid not null references orgs(id) on delete cascade,
  phase_id      uuid not null references proposal_phases(id) on delete cascade,
  position      int not null,
  label         text not null,
  completed_at  timestamptz,
  completed_by  uuid references users(id) on delete set null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index proposal_phase_gate_items_phase_idx on proposal_phase_gate_items(phase_id, position);
alter table proposal_phase_gate_items enable row level security;
create policy proposal_phase_gate_items_select on proposal_phase_gate_items for select to authenticated using (is_org_member(org_id));
create policy proposal_phase_gate_items_write on proposal_phase_gate_items for all to authenticated using (is_org_member(org_id)) with check (is_org_member(org_id));
create trigger proposal_phase_gate_items_touch_updated_at before update on proposal_phase_gate_items for each row execute function touch_updated_at();

-- ─── Change orders ───────────────────────────────────────────────────────
create table if not exists proposal_change_orders (
  id                 uuid primary key default gen_random_uuid(),
  org_id             uuid not null references orgs(id) on delete cascade,
  proposal_id        uuid not null references proposals(id) on delete cascade,
  phase_id           uuid references proposal_phases(id) on delete set null,
  number             int not null,
  title              text not null,
  description        text,
  reason             text,
  line_items         jsonb not null default '[]'::jsonb,  -- [{name, desc, qty, rate, subtotal_cents}]
  total_delta_cents  bigint not null default 0,
  schedule_delta_days int not null default 0,
  state              proposal_change_order_state not null default 'draft',
  submitted_at       timestamptz,
  submitted_by       uuid references users(id) on delete set null,
  signed_at          timestamptz,
  signed_by          uuid references users(id) on delete set null,
  signed_name        text,
  signed_email       text,
  signature_meta     jsonb,                                -- { ip, user_agent, hash }
  rejection_reason   text,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  unique (proposal_id, number)
);
create index proposal_change_orders_proposal_idx on proposal_change_orders(proposal_id, number);
create index proposal_change_orders_state_idx on proposal_change_orders(proposal_id, state);
alter table proposal_change_orders enable row level security;
create policy proposal_change_orders_select on proposal_change_orders for select to authenticated using (is_org_member(org_id));
create policy proposal_change_orders_insert on proposal_change_orders for insert to authenticated with check (has_org_role(org_id, array['owner','admin','controller','collaborator']));
create policy proposal_change_orders_update on proposal_change_orders for update to authenticated using (is_org_member(org_id)) with check (is_org_member(org_id));
create policy proposal_change_orders_delete on proposal_change_orders for delete to authenticated using (has_org_role(org_id, array['owner','admin']));
create trigger proposal_change_orders_touch_updated_at before update on proposal_change_orders for each row execute function touch_updated_at();

-- ─── Revision rounds ─────────────────────────────────────────────────────
create table if not exists proposal_revisions (
  id              uuid primary key default gen_random_uuid(),
  org_id          uuid not null references orgs(id) on delete cascade,
  proposal_id     uuid not null references proposals(id) on delete cascade,
  phase_id        uuid references proposal_phases(id) on delete set null,
  number          int not null,
  title           text not null,
  description     text,
  asset_kind      proposal_revision_asset_kind not null default 'image',
  asset_url       text,
  asset_storage_path text,
  asset_mime      text,
  state           proposal_revision_state not null default 'open',
  opened_by       uuid references users(id) on delete set null,
  opened_at       timestamptz not null default now(),
  resolved_by     uuid references users(id) on delete set null,
  resolved_at     timestamptz,
  due_at          timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (proposal_id, number)
);
create index proposal_revisions_proposal_idx on proposal_revisions(proposal_id, number);
create index proposal_revisions_state_idx on proposal_revisions(proposal_id, state);
alter table proposal_revisions enable row level security;
create policy proposal_revisions_select on proposal_revisions for select to authenticated using (is_org_member(org_id));
create policy proposal_revisions_write on proposal_revisions for all to authenticated using (is_org_member(org_id)) with check (is_org_member(org_id));
create trigger proposal_revisions_touch_updated_at before update on proposal_revisions for each row execute function touch_updated_at();

-- ─── Revision comments (threaded, optional anchor for image markup) ──────
create table if not exists proposal_revision_comments (
  id            uuid primary key default gen_random_uuid(),
  org_id        uuid not null references orgs(id) on delete cascade,
  revision_id   uuid not null references proposal_revisions(id) on delete cascade,
  parent_id     uuid references proposal_revision_comments(id) on delete cascade,
  author_id     uuid references users(id) on delete set null,
  author_label  text,
  body          text not null,
  anchor        jsonb,                                    -- { x, y, w?, h? } 0..1 normalized
  is_resolved   boolean not null default false,
  resolved_at   timestamptz,
  resolved_by   uuid references users(id) on delete set null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index proposal_revision_comments_revision_idx on proposal_revision_comments(revision_id, created_at);
alter table proposal_revision_comments enable row level security;
create policy proposal_revision_comments_select on proposal_revision_comments for select to authenticated using (is_org_member(org_id));
create policy proposal_revision_comments_write on proposal_revision_comments for all to authenticated using (is_org_member(org_id)) with check (is_org_member(org_id));
create trigger proposal_revision_comments_touch_updated_at before update on proposal_revision_comments for each row execute function touch_updated_at();

-- ─── Approvals (gates, SOWs, invoices, change orders, revisions) ────────
create table if not exists proposal_approvals (
  id              uuid primary key default gen_random_uuid(),
  org_id          uuid not null references orgs(id) on delete cascade,
  proposal_id     uuid not null references proposals(id) on delete cascade,
  kind            proposal_approval_kind not null,
  ref_id          uuid,                          -- phase_id, change_order_id, revision_id, etc
  title           text not null,
  body            text,
  state           proposal_approval_state not null default 'pending',
  requested_at    timestamptz not null default now(),
  requested_by    uuid references users(id) on delete set null,
  signed_at       timestamptz,
  signed_by       uuid references users(id) on delete set null,
  signed_name     text,
  signed_email    text,
  signature_meta  jsonb,
  rejection_reason text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index proposal_approvals_proposal_idx on proposal_approvals(proposal_id, state);
create index proposal_approvals_ref_idx on proposal_approvals(ref_id) where ref_id is not null;
alter table proposal_approvals enable row level security;
create policy proposal_approvals_select on proposal_approvals for select to authenticated using (is_org_member(org_id));
create policy proposal_approvals_write on proposal_approvals for all to authenticated using (is_org_member(org_id)) with check (is_org_member(org_id));
create trigger proposal_approvals_touch_updated_at before update on proposal_approvals for each row execute function touch_updated_at();

-- ─── Files (lives in `proposals` storage bucket; this is the index) ──────
create table if not exists proposal_files (
  id              uuid primary key default gen_random_uuid(),
  org_id          uuid not null references orgs(id) on delete cascade,
  proposal_id     uuid not null references proposals(id) on delete cascade,
  phase_id        uuid references proposal_phases(id) on delete set null,
  kind            proposal_file_kind not null default 'misc',
  name            text not null,
  description     text,
  storage_path    text not null,                 -- path within `proposals` bucket
  mime_type       text,
  size_bytes      bigint,
  uploaded_by     uuid references users(id) on delete set null,
  uploaded_at     timestamptz not null default now(),
  deleted_at      timestamptz
);
create index proposal_files_proposal_idx on proposal_files(proposal_id, uploaded_at desc) where deleted_at is null;
create index proposal_files_kind_idx on proposal_files(proposal_id, kind) where deleted_at is null;
alter table proposal_files enable row level security;
create policy proposal_files_select on proposal_files for select to authenticated using (is_org_member(org_id));
create policy proposal_files_write on proposal_files for all to authenticated using (is_org_member(org_id)) with check (is_org_member(org_id));

-- ─── Activity log (append-only audit trail surfaced to the client) ──────
create table if not exists proposal_activity (
  id            uuid primary key default gen_random_uuid(),
  org_id        uuid not null references orgs(id) on delete cascade,
  proposal_id   uuid not null references proposals(id) on delete cascade,
  actor_id      uuid references users(id) on delete set null,
  actor_label   text,
  kind          proposal_activity_kind not null,
  ref_id        uuid,
  payload       jsonb not null default '{}'::jsonb,
  created_at    timestamptz not null default now()
);
create index proposal_activity_proposal_idx on proposal_activity(proposal_id, created_at desc);
create index proposal_activity_kind_idx on proposal_activity(proposal_id, kind, created_at desc);
alter table proposal_activity enable row level security;
create policy proposal_activity_select on proposal_activity for select to authenticated using (is_org_member(org_id));
create policy proposal_activity_insert on proposal_activity for insert to authenticated with check (is_org_member(org_id));
-- Activity is append-only — no update/delete policies.

-- ─── Helpers ─────────────────────────────────────────────────────────────

-- Roll up phase subtotal from line items (excluding optionals).
create or replace function proposal_phase_subtotal_cents(p_phase_id uuid)
returns bigint language sql stable as $$
  select coalesce(sum(subtotal_cents), 0)::bigint
  from proposal_phase_line_items
  where phase_id = p_phase_id and is_optional = false;
$$;

-- Roll up proposal total across all priced phases.
create or replace function proposal_total_cents(p_proposal_id uuid)
returns bigint language sql stable as $$
  select coalesce(sum(proposal_phase_subtotal_cents(ph.id)), 0)::bigint
  from proposal_phases ph
  where ph.proposal_id = p_proposal_id;
$$;

-- Phase progress: completed gate items / total gate items.
create or replace function proposal_phase_progress(p_phase_id uuid)
returns table(completed int, total int) language sql stable as $$
  select
    count(*) filter (where completed_at is not null)::int as completed,
    count(*)::int as total
  from proposal_phase_gate_items
  where phase_id = p_phase_id;
$$;

-- Auto-advance phase state when all gate items complete.
create or replace function proposal_phase_advance_on_gate_complete()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  v_phase_id uuid;
  v_proposal_id uuid;
  v_pending int;
  v_total int;
  v_next_position int;
  v_current_position int;
begin
  v_phase_id := coalesce(new.phase_id, old.phase_id);
  if v_phase_id is null then return new; end if;

  select count(*) filter (where completed_at is null), count(*)
    into v_pending, v_total
    from proposal_phase_gate_items where phase_id = v_phase_id;

  if v_total = 0 then return new; end if;

  if v_pending = 0 then
    update proposal_phases
       set state = 'complete',
           completed_at = coalesce(completed_at, now())
     where id = v_phase_id and state <> 'complete'
     returning proposal_id, position into v_proposal_id, v_current_position;

    -- Unlock next phase
    if v_current_position is not null then
      update proposal_phases
         set state = 'active',
             started_at = coalesce(started_at, now())
       where proposal_id = v_proposal_id
         and position = v_current_position + 1
         and state = 'locked';
    end if;
  else
    -- Reopen if a previously-complete phase had a gate item un-checked
    update proposal_phases
       set state = 'gate_pending',
           completed_at = null
     where id = v_phase_id and state = 'complete';
  end if;

  return new;
end;
$$;

drop trigger if exists proposal_phase_gate_items_advance on proposal_phase_gate_items;
create trigger proposal_phase_gate_items_advance
  after insert or update or delete on proposal_phase_gate_items
  for each row execute function proposal_phase_advance_on_gate_complete();

-- ─── Notification triggers ───────────────────────────────────────────────
-- Wire change-order/revision/approval state transitions into notifications.
-- (Notifications table exists with `kind` column from migration #27.)

create or replace function proposal_notify_on_change_order_state()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'UPDATE' and old.state = new.state then return new; end if;
  insert into notifications (org_id, user_id, kind, title, body, link)
    select new.org_id, m.user_id, 'proposal',
      case new.state
        when 'submitted' then 'Change order submitted'
        when 'client_approved' then 'Change order approved'
        when 'client_rejected' then 'Change order rejected'
        else 'Change order updated'
      end,
      'CO #' || new.number || ': ' || new.title,
      '/p/' || coalesce((select slug from projects where id = (select project_id from proposals where id = new.proposal_id)), '_') ||
        '/proposals/' || new.proposal_id || '/change-orders/' || new.id
    from memberships m
   where m.org_id = new.org_id and m.role in ('owner','admin','controller','collaborator');
  return new;
end;
$$;

drop trigger if exists proposal_change_orders_notify on proposal_change_orders;
create trigger proposal_change_orders_notify
  after insert or update on proposal_change_orders
  for each row execute function proposal_notify_on_change_order_state();
