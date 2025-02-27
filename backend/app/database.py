from dotenv import load_dotenv
import os
from supabase import create_client, Client

load_dotenv()
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_ANON_KEY")
supabase : Client = create_client(SUPABASE_URL, SUPABASE_KEY)


# helper function to fetch the table data
def fetch_table_data(table_name: str):
    response = supabase.table(table_name).select('*').execute()
    print(response.data)
    return response.data

# # function that calls the helper to fetch the table data
def fetch_recipes():
    return fetch_table_data("recipes")

def fetch_steps(recipe_id: int):
    response = supabase.table("steps").select("*").eq("recipe_id", recipe_id).execute()
    return response.data

# def insert_new_row(recipe_name: str):
#     new_row = {'recipe-name': recipe_name}
#     supabase.table('demo-table').insert(new_row).execute()

# def update_row(updated_name: str, id: int):
#     new_row = {'recipe-name': updated_name}
#     supabase.table('demo-table').update(new_row).eq('id', id).execute()

# def delete_row(id: int):
#     supabase.table('demo-table').delete().eq('id', id).execute()
