SELECT tablename, policyname, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename IN ('event_registrations', 'events');
