import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

const supabaseUrl = "https://mzzmqlyoucsqwxxknawv.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseKey) {
  console.error(
    "Error: SUPABASE_SERVICE_ROLE_KEY environment variable not set"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function deployMigrations() {
  const migrationsDir = path.join(process.cwd(), "supabase/migrations");

  // Read all migration files
  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  console.log(`Found ${files.length} migration files to deploy`);

  for (const file of files) {
    const filePath = path.join(migrationsDir, file);
    const sql = fs.readFileSync(filePath, "utf-8");

    console.log(`\nDeploying ${file}...`);

    try {
      const { error } = await supabase.rpc("execute_sql", { sql });

      if (error) {
        console.error(`❌ Failed to deploy ${file}:`, error);
      } else {
        console.log(`✅ Successfully deployed ${file}`);
      }
    } catch (err) {
      console.log(`⚠️  Cannot use RPC, trying direct SQL execution...`);
      console.log(
        "Note: This requires manual execution in the Supabase dashboard"
      );
      console.log(`File: ${file}`);
      console.log(`SQL: ${sql.substring(0, 200)}...`);
    }
  }
}

deployMigrations();
