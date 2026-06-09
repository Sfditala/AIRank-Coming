CREATE TABLE public.waitlist (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.waitlist TO anon, authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.waitlist_id_seq TO anon, authenticated;
GRANT ALL ON public.waitlist TO service_role;
GRANT ALL ON SEQUENCE public.waitlist_id_seq TO service_role;
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can join the waitlist" ON public.waitlist FOR INSERT TO anon, authenticated WITH CHECK (true);