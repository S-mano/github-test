$(function (){
    $('.js-news-paged').on('change',function (){
        const params = window.location.search;
        window.location.href = $(this).val() + params;
    });
});
