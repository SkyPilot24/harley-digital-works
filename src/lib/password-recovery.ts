/** Read a Supabase recovery link without navigating to it or logging its token. */
export function recoveryTokenFromLink(value: string, supabaseUrl: string): string {
  let link: URL;
  try {
    link = new URL(value.trim());
  } catch {
    throw new Error("Paste the full link from the password recovery email.");
  }
  if (
    link.origin !== new URL(supabaseUrl).origin ||
    link.pathname !== "/auth/v1/verify" ||
    link.searchParams.get("type") !== "recovery"
  ) {
    throw new Error("Use the password recovery link for this app, copied from the email button.");
  }
  const token = link.searchParams.get("token") ?? link.searchParams.get("token_hash");
  if (!token || !/^[a-zA-Z0-9_-]{20,512}$/.test(token)) {
    throw new Error("This recovery link is incomplete. Request a new email and copy its link.");
  }
  return token;
}
