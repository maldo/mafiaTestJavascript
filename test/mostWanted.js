var chai = require('chai');
var Member = require('../member');
var Mafia = require('../mafia');

chai.should();

describe('FBI Most Wanted', function () {

  var Vito, Corleone, Sonny;
  var Michael, Tom, Vincent;
  var Fredo, Genco;

  describe('Creating a Mafia Organization', function () {
    it('should create a Mafia', function () {
      Vito = new Member('Vito', 'capo');
      Vito.isBoss().should.be.false;

      Corleone = new Mafia('Corleone', Vito);

      Corleone.getName().should.equal('Corleone');
      Corleone.getCapo().should.equal(Vito);
    });
  });

  describe('Getting a bigger Family', function() {
    it('should create a Mafia', function () {
      Sonny = new Member('Santino', 'sonny', Vito);
      Michael = new Member('Michael', 'Michael', Vito);
      Tom = new Member('Thomas', 'Tom', Vito);
      Genco = new Member('Genco', 'Genco', Vito)

      Vincent = new Member('Vincenzo', 'Vincent', Michael);
      Fredo = new Member('Frederico', 'Fredo', Michael);

      for (var i=0; i < 20; i++) {
        new Member(i, i, Vito);
        new Member(i+i, '2i ' + i, Michael);
        new Member(i*i, 'i^2', Sonny);
      }

      for (var i=0; i < 100; i++) {
        new Member(i, i, Tom);
      }

      for (var i=0; i < 100; i++) {
        new Member(i, i, Fredo);
      }

      Corleone.getMuscle(Vito).should.equal(266);

      Michael.isBoss().should.be.true;
    });
  });

  describe('Most Wanted List', function() {
    it('should return the MWL', function() {
      var mwl = Corleone.mostWanted();
      mwl.should.contain('Vito');
      mwl.should.contain('Frederico');
      mwl.should.not.contain('Santino');
    });
  });

});