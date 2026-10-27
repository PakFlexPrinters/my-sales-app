// 1. Initialize Supabase (Safe to expose publicly with RLS active!)
const SUPABASE_URL = 'https://supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjbGtrcnd6dGNlZGppa29wY3djIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMwOTM3NjAsImV4cCI6MjEwODY2OTc2MH0.XdHp6HmEjU-EIdTUlfuUCc9o_MYqPmE5VZu1rFNtqHE'; 
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Interface Elements (Make sure these IDs match the elements in your index.html)
const loginScreen = document.getElementById('login-screen');
const privateContent = document.getElementById('private-content');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('btn-login');
const logoutBtn = document.getElementById('btn-logout');
const errorMsg = document.getElementById('error-msg');

// 2. Track Auth Session (Checks if you are already logged in when refreshing)
supabase.auth.onAuthStateChange((event, session) => {
    if (session) {
        // Active Session Found -> Show Private Content
        if(loginScreen) loginScreen.classList.add('hidden');
        if(privateContent) privateContent.classList.remove('hidden');
    } else {
        // No Active Session -> Lock Content, Show Login Screen
        if(loginScreen) loginScreen.classList.remove('hidden');
        if(privateContent) privateContent.classList.add('hidden');
    }
});

// 3. Process Login Attempt
if (loginBtn) {
    loginBtn.addEventListener('click', async () => {
        if(errorMsg) errorMsg.innerText = ""; // Clear old errors
        const email = emailInput.value;
        const password = passwordInput.value;

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error && errorMsg) {
            errorMsg.innerText = error.message; // Displays invalid email/password warning
        }
    });
}

// 4. Process Logout Request
if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        await supabase.auth.signOut();
    });
}
