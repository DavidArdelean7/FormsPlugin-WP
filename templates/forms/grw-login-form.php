<div id='grw-tabs-wrapper'>
    <div id='tab-items'>
        <span class = 'tab-item tab-active' id='phone-tab'>Use phone number</span>
        <span class='tab-item' id='email-tab'>Use email address</span>
    </div>

    <div id='tabs-content'>

        <div id='phone-tab-content'>
            <div id='login_form' class='grw-form'>
                <div class='grw-form-page grw-phone-page'>
                    <div class='field-wrapper'>
                    <div id='phone_field'>
                    <select id='prefixSelect'></select>
                    <input type="tel" name="phone" id="phone" class="input" value="" size="20" autocapitalize="off" autocomplete="phone" required="required" placeholder="712 893 485">
                    </div>
                    <div class='grw-error grw-hidden'>Invalid or inexistend phone number.</div>
                    </div>
                    <div class='field-wrapper'>
                     <input type="checkbox" id="rememberme" name="rememberme"> Remember me<br>
                     </div>
                    <button id='check_login_phone'>Continue</button>
                </div>

                <div class="grw-form-page grw-hidden">
                   <div class="field-columns">
                    <div class="field-wrapper">
                    <input type="number" name="otp" id="otp" class="input" value="" required="" placeholder="SMS code">
                    <div class="grw-error grw-hidden">Invalid or expired SMS code.</div>
                    </div>
                     <button class="aux_btn" id="resend_otp">Resend OTP <span id="timer">00:0</span></button>
                    </div>
                   <div class="btn-wrapper">
                    <button class="check_otp">Log in</button>
                    <button class="back_btn aux_btn">Back</button>
                    </div>

                </div>

            </div>
        </div>
        <div id='email-tab-content' class='grw-hidden'>
            <div id='login_form_email'>
                <div class='grw-form-page'>
                    <div class='field-wrapper'>
                        <input type="email" name="email" id="email" class="input" value="" size="20" autocapitalize="off" autocomplete="email" required="required" placeholder="alex@gmail.com">
                    </div>
                    <div class='field-wrapper'>
                        <input type='password' name='password' id='password' class='input' value='' required placeholder="Parola">
                        <div class='field-wrapper'>
                            <input type="checkbox" id="rememberme" name="rememberme"> Remember me<br>
                        </div>
                        <div class='grw-error grw-hidden'>The email address and/or password are incorrect. </div>
                        <a id='lost-your-password' href='/lost-password/'>Lost your password?</a>
                    </div>
                    <div class='btn-wrapper'>
                        <button id='check_login'>Log in</button>
                    </div>
                    
            
                </div>
        
            </div>
        </div>
    </div>
</div>