import EmployeeDashboardClass from './session2-legacy/EmployeeDashboardClass';
import VulnerableComponent from './session4-security/VulnerableComponent';

function App() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1>🤖 AI + React Workshop</h1>
      
      <hr />
      
      <section>
        <h2>Session 2: Legacy Refactoring</h2>
        <EmployeeDashboardClass />
      </section>

      <hr />

      <section>
        <h2>Session 4: Security Check</h2>
        <VulnerableComponent userContent="<img src=x onerror=alert('Hacked!') /> Hello World" />
      </section>
    </div>
  );
}

export default App;