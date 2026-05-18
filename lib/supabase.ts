import { createClient, SupabaseClient } from "@supabase/supabase-js";

export type PayrollRecipient = {
  wallet: string;
  amount: number;
  memo?: string;
};

export type PayrollBatchRow = {
  id: string;
  created_at: string;
  employer_wallet: string;
  recipients: PayrollRecipient[];
  status: "pending" | "claimed";
};

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  if (!client) {
    client = createClient(url, key);
  }
  return client;
}

export async function savePayrollBatch(
  employerWallet: string,
  recipients: PayrollRecipient[],
): Promise<string> {
  const supabase = getSupabase();
  if (!supabase) {
    throw new Error("Supabase is not configured");
  }

  const { data, error } = await supabase
    .from("payroll_batches")
    .insert({
      employer_wallet: employerWallet,
      recipients,
      status: "pending",
    })
    .select("id")
    .single();

  if (error || !data?.id) {
    throw new Error(error?.message ?? "Failed to save payroll batch");
  }

  return data.id as string;
}

export async function fetchPayrollBatch(
  id: string,
): Promise<PayrollBatchRow | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("payroll_batches")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data as PayrollBatchRow;
}
