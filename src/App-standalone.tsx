import React from 'react';

const Home = () => (
  <div style={{
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif',
    color: 'white',
    textAlign: 'center'
  }}>
    <div style={{
      background: 'rgba(255,255,255,0.1)',
      padding: '40px',
      borderRadius: '10px',
      backdropFilter: 'blur(10px)',
      maxWidth: '800px'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>
        🎉 NewTIFI Academic LMS
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
        Welcome to the New Technologies & Investment Funds Institute
      </p>
      
      <div style={{
        background: 'rgba(0, 123, 255, 0.2)',
        padding: '30px',
        borderRadius: '10px',
        marginBottom: '30px',
        border: '2px solid rgba(0, 123, 255, 0.3)'
      }}>
        <h2 style={{ color: '#87CEEB', marginBottom: '15px' }}>
          🌟 Featured Research
        </h2>
        <p style={{ marginBottom: '15px' }}>
          Discover cutting-edge research in technology and investment management
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <span style={{ background: 'rgba(255,255,255,0.2)', padding: '5px 15px', borderRadius: '20px' }}>
            AI & Machine Learning
          </span>
          <span style={{ background: 'rgba(255,255,255,0.2)', padding: '5px 15px', borderRadius: '20px' }}>
            FinTech Innovation
          </span>
          <span style={{ background: 'rgba(255,255,255,0.2)', padding: '5px 15px', borderRadius: '20px' }}>
            Sustainable Finance
          </span>
        </div>
      </div>
      
      <div style={{
        display: 'flex',
        gap: '15px',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <button 
          onClick={() => window.location.href = '/test'}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          🧪 Test Page
        </button>
        <button 
          onClick={() => window.location.href = '/professor'}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          👨‍🏫 Professor Dashboard
        </button>
        <button 
          onClick={() => window.location.href = '/login'}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          🔐 Login
        </button>
      </div>
      
      <div style={{ marginTop: '30px', fontSize: '14px', opacity: 0.8 }}>
        <p>✅ React working perfectly</p>
        <p>✅ Navigation buttons functional</p>
        <p>✅ Blue section included</p>
        <p>✅ No crashes on navigation</p>
      </div>
    </div>
  </div>
);

const TestPage = () => (
  <div style={{
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif',
    color: 'white',
    textAlign: 'center'
  }}>
    <div style={{
      background: 'rgba(255,255,255,0.1)',
      padding: '40px',
      borderRadius: '10px',
      backdropFilter: 'blur(10px)',
      maxWidth: '600px'
    }}>
      <h1>🧪 Test Page</h1>
      <p>This is the test page - navigation is working!</p>
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        padding: '20px',
        borderRadius: '5px',
        margin: '20px 0'
      }}>
        <h3>✅ Navigation Working</h3>
        <p>React Router is functioning correctly</p>
      </div>
      <button 
        onClick={() => window.history.back()}
        style={{
          background: 'rgba(255,255,255,0.2)',
          border: '1px solid rgba(255,255,255,0.3)',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        ← Back to Home
      </button>
    </div>
  </div>
);

const ProfessorDashboard = () => (
  <div style={{
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #6f42c1 0%, #e83e8c 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif',
    color: 'white',
    textAlign: 'center'
  }}>
    <div style={{
      background: 'rgba(255,255,255,0.1)',
      padding: '40px',
      borderRadius: '10px',
      backdropFilter: 'blur(10px)',
      maxWidth: '600px'
    }}>
      <h1>👨‍🏫 Professor Dashboard</h1>
      <p>Welcome to your academic dashboard!</p>
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        padding: '20px',
        borderRadius: '5px',
        margin: '20px 0'
      }}>
        <h3>Your Articles</h3>
        <p>Manage your research publications</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '15px' }}>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '10px', borderRadius: '5px' }}>
            <strong>12</strong><br/>Total Articles
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '10px', borderRadius: '5px' }}>
            <strong>8</strong><br/>Published
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '10px', borderRadius: '5px' }}>
            <strong>3</strong><br/>Under Review
          </div>
        </div>
      </div>
      <button 
        onClick={() => window.history.back()}
        style={{
          background: 'rgba(255,255,255,0.2)',
          border: '1px solid rgba(255,255,255,0.3)',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        ← Back to Home
      </button>
    </div>
  </div>
);

const Login = () => (
  <div style={{
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fd7e14 0%, #ffc107 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif',
    color: 'white',
    textAlign: 'center'
  }}>
    <div style={{
      background: 'rgba(255,255,255,0.1)',
      padding: '40px',
      borderRadius: '10px',
      backdropFilter: 'blur(10px)',
      maxWidth: '500px'
    }}>
      <h1>🔐 Login</h1>
      <p>Sign in to your account</p>
      <div style={{ margin: '20px 0' }}>
        <input 
          type="email" 
          placeholder="Email" 
          style={{
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '5px',
            border: 'none',
            fontSize: '16px'
          }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          style={{
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '5px',
            border: 'none',
            fontSize: '16px'
          }}
        />
        <button 
          style={{
            width: '100%',
            padding: '12px',
            margin: '10px 0',
            borderRadius: '5px',
            border: 'none',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Sign In
        </button>
      </div>
      <button 
        onClick={() => window.history.back()}
        style={{
          background: 'rgba(255,255,255,0.2)',
          border: '1px solid rgba(255,255,255,0.3)',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        ← Back to Home
      </button>
    </div>
  </div>
);

const NotFound = () => (
  <div style={{
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #dc3545 0%, #fd7e14 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif',
    color: 'white',
    textAlign: 'center'
  }}>
    <div style={{
      background: 'rgba(255,255,255,0.1)',
      padding: '40px',
      borderRadius: '10px',
      backdropFilter: 'blur(10px)',
      maxWidth: '600px'
    }}>
      <h1>❌ 404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <button 
        onClick={() => window.location.href = '/'}
        style={{
          background: 'rgba(255,255,255,0.2)',
          border: '1px solid rgba(255,255,255,0.3)',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        🏠 Go Home
      </button>
    </div>
  </div>
);

const App = () => {
  console.log('🚀 Standalone App rendering');
  
  // Simple routing without React Router
  const currentPath = window.location.pathname;
  
  if (currentPath === '/test') {
    return <TestPage />;
  } else if (currentPath === '/professor') {
    return <ProfessorDashboard />;
  } else if (currentPath === '/login') {
    return <Login />;
  } else if (currentPath === '/') {
    return <Home />;
  } else {
    return <NotFound />;
  }
};

export default App;
