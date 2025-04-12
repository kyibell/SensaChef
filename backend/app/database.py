from dotenv import load_dotenv
import os
from supabase import create_client, Client

load_dotenv()
SUPABASE_URL = os.environ.get("SUPABASE_URL").strip()
SUPABASE_ANON_KEY = os.environ.get("SUPABASE_ANON_KEY").strip()
SUPABASE_SERVICE_ROLE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY").strip()

# Public client for regular operations
supabase: Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

# Admin client for privileged operations (e.g., deleting a user)
admin_supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

