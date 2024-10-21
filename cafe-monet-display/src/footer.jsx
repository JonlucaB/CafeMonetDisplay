import React from 'react';
import Popup from 'reactjs-popup';

export default function Footer() {
    const handleClick = () => {

    }

    return (
        <div>
            <br />
           <Popup trigger=
                {<button>Privacy Policy</button>}
                modal nested>
                    {
                        close => (
                            <div className='modal'>
                                <div className='content'>
                                    <b>Privacy Policy</b>

                                    Effective Date: Oct 22, 2024

                                    <b>1. Introduction</b>

                                    Cafe Monet Reservation Display is committed to protecting the privacy of the users. This Privacy Policy outlines how personal data is collected, used, and stored.

                                    <b>2. Information Collected</b>

                                    Personal Information: When you log in using your Google account, we access your Google Calendar data, including the calendars you use and the events within those calendars. This information is essential for providing the app's core functionality.
                                
                                    <b>3. How We Use Your Information</b>

                                    Service Provision: We use the collected calendar data to display your events within the app, enabling you to manage your schedule effectively.

                                    Data Handling: We do not share, sell, or transmit your personal information to any third parties. Your data remains within the app and is used solely for the purposes of providing and enhancing our services.

                                    <b>4. Data Storage and Security</b>

                                    Storage: Your calendar data is stored securely on your device and is not transmitted to external servers.

                                    Security Measures: We implement industry-standard security protocols to protect your data from unauthorized access or disclosure.

                                    <b>5. User Rights</b>

                                    Access and Control: You have the right to access and manage the personal information we collect. If you wish to revoke the app's access to your Google Calendar, you can do so through your Google account settings.
                                    
                                    <b>6. Compliance with Google Policies</b>

                                    Google API Services: Our app's use of your data adheres to the Google API Services User Data Policy. We only request the necessary scopes required for the app's functionality and handle your data in accordance with Google's guidelines.
                                    
                                    <b>7. Changes to This Privacy Policy</b>

                                    Updates: We may update this Privacy Policy from time to time. Any changes will be reflected within the app and on our website. Your continued use of the app after such changes indicates your acceptance of the updated policy.
                                    
                                    <b>8. Contact Information</b>

                                    If you have any questions or concerns about this Privacy Policy or your data, please contact the developer at Jonlucabiagini@gmail.com.
                                    <br />
                                    By using Cafe Monet Reservation Display, you agree to the terms of this Privacy Policy.
                                    <button onClick={() => close()} className='calendarButton'>Finished</button>
                                </div>
                            </div>
                        )
                    }
            </Popup>
        </div>
    )
};