import 'dotenv/config'
import { syncPlans } from "../server/actions/user-plans"

async function main() {
  try {
    console.log("Starting plan sync...")
    const result = await syncPlans()
    console.log("Sync completed successfully:", result)
  } catch (error) {
    console.error("Sync failed:", error)
  } finally {
    // Close the database connection
    console.log("Database connection closed")
    process.exit(0)
  }
}

main()
