const { Client } = require('pg');

const footerItems = [
  { label: 'nav.about', path: '/#about', order_index: 0, position: 'footer' },
  { label: 'nav.services', path: '/#services', order_index: 1, position: 'footer' },
  { label: 'nav.products', path: '/san-pham', order_index: 2, position: 'footer' },
  { label: 'nav.contact', path: '/#contact', order_index: 3, position: 'footer' },
];

async function seedFooter() {
  const client = new Client({
    user: 'postgres',
    host: 'db.qfofluefvivsfleaeglg.supabase.co',
    database: 'postgres',
    password: '9TLYHy6SRk*$q#y',
    port: 5432,
    ssl: { rejectUnauthorized: false }
  });
  
  await client.connect();

  console.log('Seeding footer navigation items...');
  
  for (const item of footerItems) {
    // Check if it exists
    const check = await client.query('SELECT id FROM navigation WHERE label = $1 AND position = $2', [item.label, item.position]);
    
    if (check.rows.length === 0) {
      await client.query(
        'INSERT INTO navigation (label, path, order_index, position, is_active) VALUES ($1, $2, $3, $4, true)',
        [item.label, item.path, item.order_index, item.position]
      );
      console.log(`Inserted: ${item.label}`);
    } else {
      console.log(`Exists: ${item.label}`);
    }
  }

  await client.end();
  console.log('Footer seed completed successfully!');
}

seedFooter().catch(console.error);
