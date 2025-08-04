// scripts/debug-backend.js - Debug script voor backend verbinding
const BACKEND_URL = 'http://localhost:9000'

async function testBackendConnection() {
    console.log('🔍 Testing Medusa v2.8 Backend Connection...')
    console.log('URL:', BACKEND_URL)

    try {
        // Test 1: Health Check
        console.log('\n1️⃣ Testing Health Endpoint...')
        const healthResponse = await fetch(`${BACKEND_URL}/health`)
        console.log('Health Status:', healthResponse.status)
        console.log('Health OK:', healthResponse.ok)

        if (healthResponse.ok) {
            const healthText = await healthResponse.text()
            console.log('Health Response:', healthText)
        }

        // Test 2: Store Regions
        console.log('\n2️⃣ Testing Store Regions...')
        const regionsResponse = await fetch(`${BACKEND_URL}/store/regions`)
        console.log('Regions Status:', regionsResponse.status)
        console.log('Regions OK:', regionsResponse.ok)

        if (regionsResponse.ok) {
            const regionsData = await regionsResponse.json()
            console.log('Regions Data:', JSON.stringify(regionsData, null, 2))
            console.log('Available Regions:')
            regionsData.regions?.forEach(region => {
                console.log(`  - ${region.name} (${region.currency_code}) - Countries:`,
                    region.countries?.map(c => c.iso_2).join(', ') || 'None')
            })
        }

        // Test 3: Store Products
        console.log('\n3️⃣ Testing Store Products...')
        const productsResponse = await fetch(`${BACKEND_URL}/store/products`)
        console.log('Products Status:', productsResponse.status)
        console.log('Products OK:', productsResponse.ok)

        if (productsResponse.ok) {
            const productsData = await productsResponse.json()
            console.log('Products Count:', productsData.products?.length || 0)
            if (productsData.products?.length > 0) {
                console.log('Sample Product:', JSON.stringify(productsData.products[0], null, 2))
            }
        }

        // Test 4: CORS Headers
        console.log('\n4️⃣ Testing CORS Headers...')
        console.log('Health CORS:', healthResponse.headers.get('access-control-allow-origin'))
        console.log('Products CORS:', productsResponse.headers.get('access-control-allow-origin'))

        // Test 5: Check if specific countries exist
        console.log('\n5️⃣ Checking for Netherlands/Europe support...')
        if (regionsResponse.ok) {
            const regionsData = await regionsResponse.json()
            const hasNL = regionsData.regions?.some(region =>
                region.countries?.some(country => country.iso_2 === 'nl')
            )
            const hasEU = regionsData.regions?.some(region =>
                region.name?.toLowerCase().includes('europe')
            )
            console.log('Has Netherlands (NL):', hasNL)
            console.log('Has Europe region:', hasEU)

            if (!hasNL && !hasEU) {
                console.log('⚠️  No Netherlands or Europe region found!')
                console.log('💡 You may need to:')
                console.log('   1. Run seed script: npm run seed')
                console.log('   2. Add Netherlands to existing region')
                console.log('   3. Create Europe region with NL country')
            }
        }

    } catch (error) {
        console.error('\n❌ Connection Error:', error.message)
        console.log('\n🔧 Troubleshooting:')
        console.log('1. Check if Medusa backend is running: `cd chador-shop && npm run dev`')
        console.log('2. Verify backend is on port 9000')
        console.log('3. Check backend logs for errors')
        console.log('4. Test manually: `curl http://localhost:9000/health`')
        console.log('5. Check CORS settings in medusa-config.ts')
        console.log('6. Ensure regions are seeded: `npm run seed`')
    }
}

// Functie om data direct te seeden
async function quickSeedRegion() {
    console.log('\n🌱 Quick seeding Europe region...')

    const createRegionPayload = {
        name: "Europe",
        currency_code: "eur",
        countries: ["gb", "de", "dk", "se", "fr", "es", "it", "nl"]
    }

    try {
        // Let op: Dit werkt alleen als je admin access hebt
        const response = await fetch(`${BACKEND_URL}/admin/regions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Je hebt een admin token nodig hier
            },
            body: JSON.stringify(createRegionPayload)
        })

        if (response.ok) {
            console.log('✅ Europe region created successfully')
        } else {
            console.log('❌ Failed to create region:', response.status)
            console.log('💡 Use the admin dashboard or run the seed script instead')
        }
    } catch (error) {
        console.log('❌ Seed error:', error.message)
        console.log('💡 Use: cd chador-shop && npm run seed')
    }
}

// Run in browser console or Node.js
if (typeof window !== 'undefined') {
    // Browser environment
    testBackendConnection()

    // Expose function globally for easy access
    window.testBackend = testBackendConnection
    window.seedRegion = quickSeedRegion
} else {
    // Node.js environment
    const fetch = require('node-fetch')
    testBackendConnection()
}

