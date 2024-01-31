<div id='register_form' class='grw-form'>
    
    
     <div class='grw-form-page'>
         <h6>Let's start the account creation!</h6>
         <div class='field-columns'>
            <div class='field-wrapper'>
            <input type='text' name='first_name' id='first_name' required="required" placeholder='First name'>
            <div class='grw-error grw-hidden'>Please fill out this required field.</div>
            </div>
            <div class='field-wrapper'>
            <input type='text' name='last_name' id='last_name' required="required" placeholder='Last name'>
            <div class='grw-error grw-hidden'>Please fill out this required field.</div>
            </div>
        </div>
       
        <button class='next_btn firstname_btn'>Continue</button>
        
    </div>
    
    <div class='grw-form-page grw-hidden'>
        <h6><span class='firstname'></span>, we'll also need your email address. </h6>
        <div class='field-wrapper'>
        <input type='email' name='email' id='email' required="required" placeholder="Email">
        <div class='grw-error grw-hidden'>Invalid email address.</div>
        </div>
         <div class='btn-wrapper'>
       <button class='email_btn'>Continue</button>
            <button class='back_btn aux_btn'>Back</button>
        </div>
    </div>
    
    <div class='grw-form-page grw-hidden'>
        <h6>We'll protect your data, <span class='firstname'></span><br>
        Please choose and confirm a password.</h6>
        <div class='field-wrapper'>
        <input type='password' name='password' id='password' required="required" placeholder='Parola'>
        <div class='grw-error grw-hidden'>The password must contain at least 8 characters, including: an uppercase letter, a lowercase letter, a number, a special symbol (no other types of characters).</div>
        </div>
        <div class='field-wrapper'>
        <input type='password' name='confirm_password' id='confirm_password' required="required" placeholder='Confirmă parola'>
        <div class='grw-error grw-hidden'>Passwords not matching.</div>
        </div>
        <div class='btn-wrapper'>
       <button id='password_btn' class='next_btn'>Continue</button>
            <button class='back_btn aux_btn'>Back</button>
        </div>
    </div>
     <!--
    <div class='grw-form-page grw-hidden'>
        <h6>Începem pasul cel mai emoționant, <span class='firstname'></span>. Ai ales deja ziua nunții? Dacă nu, setează o dată aproximativă pentru acum; ajustările pot fi făcute pe parcurs.</h6>
        <div class='field-wrapper'>
            <input name="wedding_date" type="date" data-field-name="wedding_date" id="wedding_date"  required="required" min="<?php echo date('Y-m-d'); ?>">
            <div class='grw-error grw-hidden'>Vă rugăm să completați acest câmp obligatoriu.</div>
        </div>
        <div class='btn-wrapper'>
       <button class='next_btn'>Continue</button>
            <button class='back_btn aux_btn'>Back</button>
        </div>
    </div>
   
    <div class='grw-form-page grw-hidden grw-location-page'>
        <h6>Scenariul perfect, <span class='firstname'></span>, are nevoie de locația perfectă. Care este orașul ales pentru ziua ta specială? Și dacă ești în dubii, nu e o problemă; alegerea poate fi revizuită.</h6>
        <div class='field-wrapper'>
            <select id='countySelect'>
                <option></option>
            </select>
			<div class='grw-error grw-hidden'>Vă rugăm să completați acest câmp obligatoriu.</div>
        </div>
		<div class='field-wrapper'>
			<div class='animation-field'>
				<select id='citySelect'>
					<option></option>
				</select>
				<div class="lds-ring" id='loader-animation'><div></div><div></div><div></div><div></div></div>
			</div>
			<div class='grw-error grw-hidden'>Vă rugăm să completați acest câmp obligatoriu.</div>
		</div>
                 <div class='btn-wrapper'>
       <button class='next_btn'>Continuă</button>
            <button class='back_btn aux_btn'>Pasul anterior</button>
        </div>
    </div>
-->
    <div class='grw-form-page grw-hidden grw-phone-page'>
        <h6>Last registration step!<br>
        <span class='firstname'></span>, please validate your phone number with an OTP code. </h6>
       <div class='field-wrapper'>
        <div id='phone_field'>
        <select id='prefixSelect'></select>
        <input type="tel" name="phone" id="phone" class="input" value="" size="20" autocapitalize="off" autocomplete="phone" required="required" placeholder="712893485">
        </div>
        <div class='grw-error grw-hidden'>Invalid or inexistent phone number.</div>
        </div>
        <div class="field-wrapper">
         <input type="checkbox" id="rememberme" name="rememberme"> Remember me<br>
         </div>
        <div class='btn-wrapper'>
       <button id='check_login_phone'>Continue</button>
            <button class='back_btn aux_btn'>Back</button>
        </div>
    </div>
    
   <div class="grw-form-page grw-hidden">
       <h6>Almost done, <span class='firstname'></span>!<br>
       Enter the received OTP code to create your account.</h6>
       <div class="field-columns">
        <div class="field-wrapper">
        	<input type="number" name="otp" id="otp" class="input" value="" required="" placeholder="Cod OTP">
		
        	<div class='grw-error grw-hidden'>Invalid or expired code.</div>
        </div>
         <button class='aux_btn' disabled="true" id="resend_otp">Resend OTP <span id="timer">00:30</span></button>
        </div>
	   <div class='grw-error grw-hidden' id='api_error'>
		   A technical error occured. Please send the OTP code on email.
	   </div>
	   <button id="email_otp" class='grw-hidden'>Send the code on email</button>
       <div class='btn-wrapper'>
        <button id='register_btn' class='check_otp'>Register</button>
        <button class='back_btn aux_btn'>Back</button>
        </div>

    </div>
    
</div>