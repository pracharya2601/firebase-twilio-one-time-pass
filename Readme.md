# Firebase intregation with twilio 

<h1>
    <a id="user-content-introduction" class="anchor" aria-hidden="true" href="#introduction">
        <svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>
    </a>
    Introduction
</h1>
<p>Twilio Intregation with firebase cloud function for one time password</p>
<ul>
<li>Create Guest Account with Phone Number</li>
<li>Send code to user to authinticate</li>
<li>Verify code to verify user</li>
<li>Generate Token</li>
</ul>

<h1><a id="user-content-pre-requisites" class="anchor" aria-hidden="true" href="#pre-requisites"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Pre requisites</h1>

<ul>
    <li>NPM installed. More info here <a href="https://nodejs.org/en/" rel="nofollow">https://nodejs.org/en/</a></li>
    <li>Create a Firebase Project on <a href="https://console.firebase.google.com/" rel="nofollow">https://console.firebase.google.com/</a>. Follow the Firebase Documentation to create a new project on the Firebase console.</li>
    <li>Install Firebase CLI running <code>npm install -g firebase-tools</code>.
        More info here <a href="https://firebase.google.com/docs/cli/" rel="nofollow">https://firebase.google.com/docs/cli/</a>
        If the command fails, you may need to change npm permissions as described here <a href="https://docs.npmjs.com/getting-started/fixing-npm-permissions" rel="nofollow">https://docs.npmjs.com/getting-started/fixing-npm-permissions</a> or try to install Firebase CLI locally with <code>npm install firebase-tools@</code>
    </li>
</ul>

<h1><a id="user-content-project-setup" class="anchor" aria-hidden="true" href="#project-setup"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Project setup</h1>

<ul>
<li>Login to Firebase CLI with <code>firebase login</code>. If you are not in localhost run <code>firebase login --no-localhost</code>
More info here  <a href="https://firebase.google.com/docs/cli/" rel="nofollow">https://firebase.google.com/docs/cli/</a></li>
<li>Set up your Firebase project by running <code>firebase use --add</code>, select your Project ID and follow the instructions.</li>
</ul>

<ul>
<li>Login to Firebase CLI with <code>firebase login</code>. If you are not in localhost run <code>firebase login --no-localhost</code>
More info here  <a href="https://firebase.google.com/docs/cli/" rel="nofollow">https://firebase.google.com/docs/cli/</a></li>
<li>Set up your Firebase project by running <code>firebase use --add</code>, select your Project ID and follow the instructions.</li>
</ul>

<h1><a id="user-content-twilio" class="anchor" aria-hidden="true" href="#twilio"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a> Twilio Setup</h1>

<ul>
<li>
    Login to <a href="https://www.twilio.com/" target="_/blank">Twilio account</a>
</li>
<li>
    Set up for new Phone number and follow documentation on dashboard to continue. And get your phone number.
</li>
<li>
    Install twilio using command line <code>npm install twilio </code> 
</li>
<li>
    Create <code> twilio.js</code> file and paste the following code
    <p><code>
        const twilio = require('twilio');
    </code></p>
    <p><code>
        const accountSid = 'twilio accountSid key'; 
    </code></p>
    <p><code>
        const authToken = "twilio authTOken";
   </code></p>
   <p><code>
        module.exports = new twilio.Twilio(accountSid, authToken);
    </code></p>

</li>
<p>Your are good to go </p>
</ul>

<h1><a id="user-content-deploy" class="anchor" aria-hidden="true" href="#deploy"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Deploy</h1>

<ul>
<li>Deploy to Firebase using the following command: <code>firebase deploy</code>. You can see the deployed functions on the Firebase Console under Functions menu.</li>
</ul>

