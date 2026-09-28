const fs = require('fs');
let html = fs.readFileSync('application.html', 'utf-8');

const modalHtml = `
    <!-- Google Review Modal -->
    <div id="reviewModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 9999; justify-content: center; align-items: center;">
      <div style="background: white; padding: 40px; border-radius: 8px; max-width: 500px; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.15); margin: 20px;">
        <svg style="width: 64px; height: 64px; color: #10B981; margin: 0 auto 20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <h2 style="color: var(--color-navy-700); margin-bottom: 15px;">Application Submitted Successfully!</h2>
        <p style="color: var(--color-slate-600); margin-bottom: 20px; font-size: 1.1rem; line-height: 1.5;">Thank you for trusting 24/7 Bail Bonds. We are reviewing your application and will be in touch shortly.</p>
        <p style="color: var(--color-slate-700); margin-bottom: 30px; font-weight: 600;">Would you mind taking a moment to leave us a review on Google? It really helps us out.</p>
        <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
          <a href="#" target="_blank" class="btn btn-primary" style="padding: 12px 32px; text-decoration: none; border-radius: 4px; font-weight: 600;">Leave a Review</a>
          <button type="button" id="closeReviewModal" style="padding: 12px 32px; border: 1px solid var(--color-slate-300); background: var(--color-slate-100); color: var(--color-slate-700); cursor: pointer; border-radius: 4px; font-weight: 600;">Maybe Later</button>
        </div>
      </div>
    </div>

<script>
  document.addEventListener("DOMContentLoaded", function() {
      // Check for success param
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('success') === 'true') {
          const reviewModal = document.getElementById("reviewModal");
          if (reviewModal) {
              reviewModal.style.display = "flex";
          }
          
          // Clean up URL so it doesn't pop up again on refresh
          window.history.replaceState({}, document.title, window.location.pathname);
      }

      const closeReviewModal = document.getElementById("closeReviewModal");
      if (closeReviewModal) {
          closeReviewModal.addEventListener("click", () => {
              document.getElementById("reviewModal").style.display = "none";
          });
      }
  });
</script>
`;

html = html.replace('</body>', modalHtml + '\n</body>');
fs.writeFileSync('application.html', html, 'utf-8');
console.log("Added modal HTML successfully.");
