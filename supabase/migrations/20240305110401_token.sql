CREATE TABLE IF NOT EXISTS  public.tokens (
    id SERIAL PRIMARY KEY,
    user_id uuid NOT NULL,
    access_token text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    FOREIGN KEY (user_id) REFERENCES users (id)
) TABLESPACE pg_default;

CREATE OR REPLACE FUNCTION public.add_token(
    p_user_id uuid,
    p_access_token text
)
RETURNS void AS $$
BEGIN
    INSERT INTO public.tokens (user_id, access_token)
    VALUES (p_user_id, p_access_token);
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION public.find_token(
    p_access_token text
)
RETURNS BOOLEAN AS $$
DECLARE
    token_exists BOOLEAN;
BEGIN
    SELECT EXISTS(
        SELECT 1
        FROM public.tokens
        WHERE access_token = p_access_token
    ) INTO token_exists;

    RETURN token_exists;
END;
$$ LANGUAGE plpgsql;
