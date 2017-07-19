function main()
{
    var a = 1;
    var f = ( function(a) { return function() { console.log(a); } } )(a);
    a = 2;
    f();
}
main();
