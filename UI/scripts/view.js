const humberger = document.querySelector( '#menu' );
humberger.addEventListener( 'click', () =>
{

    document.querySelector( '#navigator' ).classList.toggle( 'show' );
} );


const view = document.querySelector( ".design" );
const arrow = document.querySelector( ".arrow" );
const hide = document.querySelector( ".designUp" )


view.addEventListener( "click", () =>
{
    hide.style.display= "block";
    document.querySelector( ".more" ).style.display = "block";

    view.style.display = "none";
   
} );

hide.addEventListener( "click", () =>
{
    hide.style.display = "none";
    document.querySelector( ".more" ).style.display = "none";

    view.style.display = "block";

} );