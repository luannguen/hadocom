-- SEED ADMIN USER
-- Email: admin@vrc.com.vn
-- Password: Admin@123456

DO $$
DECLARE
    admin_id UUID := 'a1111111-1111-1111-1111-111111111111';
    admin_email TEXT := 'admin@vrc.com.vn';
    admin_password TEXT := 'Admin@123456';
    hashed_password TEXT;
BEGIN
    -- 1. Create password hash using pgcrypto (Bcrypt)
    -- Supabase uses $2a$ or $2b$ prefix for bcrypt. gen_salt('bf') creates $2a$.
    hashed_password := crypt(admin_password, gen_salt('bf', 10));

    -- 2. Insert into auth.users if not exists
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = admin_email) THEN
        INSERT INTO auth.users (
            id,
            instance_id,
            email,
            encrypted_password,
            email_confirmed_at,
            raw_app_meta_data,
            raw_user_meta_data,
            aud,
            role,
            created_at,
            updated_at,
            confirmation_token,
            recovery_token,
            email_change_token_new,
            email_change
        ) VALUES (
            admin_id,
            '00000000-0000-0000-0000-000000000000',
            admin_email,
            hashed_password,
            now(),
            '{"provider":"email","providers":["email"]}',
            '{"full_name":"Hadocom Admin", "role":"admin"}',
            'authenticated',
            'authenticated',
            now(),
            now(),
            '',
            '',
            '',
            ''
        );

        -- Also need to insert into auth.identities to allow sign in
        INSERT INTO auth.identities (
            id,
            user_id,
            identity_data,
            provider,
            provider_id,
            last_sign_in_at,
            created_at,
            updated_at
        ) VALUES (
            admin_id,
            admin_id,
            format('{"sub":"%s","email":"%s"}', admin_id, admin_email)::jsonb,
            'email',
            admin_id,
            now(),
            now(),
            now()
        );
    ELSE
        SELECT id INTO admin_id FROM auth.users WHERE email = admin_email;
    END IF;

    -- 3. Insert into public.users (Profile)
    INSERT INTO public.users (id, email, full_name, role)
    VALUES (admin_id, admin_email, 'Hadocom Admin', 'admin')
    ON CONFLICT (id) DO UPDATE 
    SET role = 'admin', full_name = 'Hadocom Admin';

END $$;
