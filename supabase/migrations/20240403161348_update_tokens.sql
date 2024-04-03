ALTER TABLE public.tokens
ADD COLUMN name text;

DROP FUNCTION IF EXISTS public.add_token();

CREATE OR REPLACE FUNCTION public.add_token(name text)
RETURNS uuid AS $$
DECLARE
    new_id uuid;
BEGIN
    INSERT INTO public.tokens (user_id, name)
    VALUES (auth.uid(), name)
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
