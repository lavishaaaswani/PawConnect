document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.stray-form');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const data = {
        name: form[0].value,
        email: form[1].value,
        location: form[2].value,
        description: form[3].value,
      };
  
      try {
        const response = await fetch('/api/strays', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          alert(result.message);
          form.reset();
        } else {
          alert(result.error || 'Something went wrong. Try again.');
        }
      } catch (err) {
        alert('Error submitting report. Please check your internet/server.');
        console.error(err);
      }
    });
  });
  