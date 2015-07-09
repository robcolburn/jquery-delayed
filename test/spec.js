describe("jquery-delayed", function(){
  beforeEach(function () {
    $('body').append('<div id="temp" />');
  });
  afterEach(function () {
    $('#temp').remove();
  });

  it('Things do not happen too early', function () {
    $('#temp').delayed('addClass', 'awesome', 50);
    chai.expect(!$('#temp').hasClass('awesome'));
  });
  it('Things happen when they are supposed to', function (done) {
    $('#temp').delayed('addClass', 'awesome', 50);
    setTimeout(function() {
      chai.expect($('#temp').hasClass('awesome'));
      done();
    }, 50);
  });
  it('Things can queue up', function (done) {
    var $temp = $('#temp');
    $temp
      .delayed('addClass', 'a', 50)
      .delayed('addClass', 'b', 50)
      .delayed('removeClass', 'a', 50);
    setTimeout(function() {
      chai.expect($temp.hasClass('a'));
      chai.expect(!$temp.hasClass('b'));
      done();
    }, 50);
    setTimeout(function() {
      chai.expect($temp.hasClass('a'));
      chai.expect($temp.hasClass('b'));
      done();
    }, 50);
    setTimeout(function() {
      chai.expect(!$temp.hasClass('a'));
      chai.expect($temp.hasClass('b'));
      done();
    }, 50);
  });
});
