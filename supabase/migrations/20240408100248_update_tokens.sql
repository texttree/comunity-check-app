ALTER TABLE public.tokens
ADD COLUMN name text;

DROP FUNCTION IF EXISTS public.add_token;

CREATE OR REPLACE FUNCTION public.add_token(p_name text)
RETURNS uuid AS $$
DECLARE
    new_id uuid;
BEGIN
    IF EXISTS (SELECT 1 FROM public.tokens WHERE user_id = auth.uid() AND name = p_name) THEN
        RAISE EXCEPTION 'Token with name % already exists for the current user', p_name;
    END IF;

    INSERT INTO public.tokens (user_id, name)
    VALUES (auth.uid(), p_name)
    RETURNING id INTO new_id;
    
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION public.get_tokens()
RETURNS SETOF public.tokens AS $$
BEGIN
    RETURN QUERY
        SELECT * FROM public.tokens WHERE user_id = auth.uid();
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION public.delete_token(token_id uuid)
RETURNS void AS $$
BEGIN
    DELETE FROM public.tokens WHERE id = token_id;
END;
$$ LANGUAGE plpgsql;
