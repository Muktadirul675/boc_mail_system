import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://gfcreviwzumnrynzxwmm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmY3Jldml3enVtbnJ5bnp4d21tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYyMDIwMTgsImV4cCI6MjAyMTc3ODAxOH0.-5NaJ0OFeMaJVBSvvw4NTV-Gmu8FZLqZ2NRmWwabGfU')

