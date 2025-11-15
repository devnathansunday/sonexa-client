export async function GET(request) {
  // Step 1: Check if request is authorized
  const authHeader = request.headers.get('authorization');
  const expectedAuth = `Bearer ${process.env.CRON_SECRET}`;

  console.log(expectedAuth);
  
  // If no secret set or doesn't match, reject
  if (authHeader !== expectedAuth) {
    // console.log('❌ Unauthorized ping attempt');
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Step 2: Ping your Express server
  try {
    const EXPRESS_URL = process.env.NEXT_EXPRESS_API_URL || 'http://192.168.137.1:4000';
    
    // console.log('🏓 Pinging server:', EXPRESS_URL);
    
    const response = await fetch(`${EXPRESS_URL}/ping`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }
  
    const data = await response.json();
  
    // console.log('✅ Server is alive:', data);
    
    return Response.json({ 
      success: true, 
      message: 'Ping successful',
      serverResponse: data,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Ping failed:', error.message);
  
    return Response.json({ 
      success: false, 
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}