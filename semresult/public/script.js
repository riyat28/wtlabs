$(document).ready(()=>{
    $('form').submit((event)=>{
        event.preventDefault();
        const formData=$('form').serialize();
        $.post('/calculate',formData,(data)=>{
            $('#result').html(data);
        })
    })
})