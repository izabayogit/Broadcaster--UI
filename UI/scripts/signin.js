const humberger = document.querySelector( '#menu' );
humberger.addEventListener( 'click', () =>
{

    document.querySelector( '#navigator' ).classList.toggle( 'show' );
} );


const staff = document.querySelector( ".staffForm" );
const user = document.querySelector( ".form" );
const staffButton = document.querySelector( "#staffButton" );
const loginButton = document.querySelector( "#loginButton" );

staffButton.addEventListener( "click", () =>
{
    
    staff.style.display = "block";
    user.style.display = "none";
} );
  
loginButton.addEventListener( "click", () =>
{
    staff.style.display = "none";
    user.style.display = "block";  
})