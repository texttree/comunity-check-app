DELETE FROM auth.audit_log_entries;
DELETE FROM auth.users;


--INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES

	--('00000000-0000-0000-0000-000000000000', '08abf809-0989-4486-ac9a-612ae593f020', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"den.arger@gmail.com","user_id":"4686d99d-32f7-4fe7-8df1-aa7bce0b5079","user_phone":""}}', '2024-04-18 09:32:29.566608+00', '');

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '4686d99d-32f7-4fe7-8df1-aa7bce0b5079', 'authenticated', 'authenticated', 'den.arger@gmail.com', '$2a$10$AkQkpddk6xdvCzX5e.J2WelZQ/YzkU724zYMKkW.dEO9SdklwscBm', '2024-04-18 09:32:29.567731+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2024-04-18 09:32:29.562223+00', '2024-04-18 09:32:29.567935+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);

--INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
--	('4686d99d-32f7-4fe7-8df1-aa7bce0b5079', '4686d99d-32f7-4fe7-8df1-aa7bce0b5079', '{"sub": "4686d99d-32f7-4fe7-8df1-aa7bce0b5079", "email": "den.arger@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2024-04-18 09:32:29.565752+00', '2024-04-18 09:32:29.565812+00', '2024-04-18 09:32:29.565812+00', 'f3b127aa-b4af-4905-88b2-a3633a2c1ac7');
