-- Run in Supabase SQL editor for batch QR payroll claims
create table if not exists payroll_batches (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  employer_wallet text not null,
  recipients jsonb not null,
  status text not null default 'pending' check (status in ('pending', 'claimed'))
);

alter table payroll_batches enable row level security;

create policy "Allow anon read payroll_batches"
  on payroll_batches for select
  to anon
  using (true);

create policy "Allow anon insert payroll_batches"
  on payroll_batches for insert
  to anon
  with check (true);
