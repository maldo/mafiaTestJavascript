var chai = require('chai');
var Member = require('../member');
var Mafia = require('../mafia');

chai.should();

describe('Mafia organization', function () {

  var Vito;
  var Corleone;
  var Sonny;
  var Michael;
  var Tom;
  var Vincent;

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

      Vincent = new Member('Vincenzo', 'Vincent', Michael);

      Michael.isBoss().should.be.true;
    });
  });

  describe('Jail and Freedom', function() {
    it('Michael goes to jail, realocating his soldiers', function() {
      Corleone.setInJail(Michael);
      Michael.isFree().should.be.false;

      Vincent.getBoss().should.equal(Sonny);

    });

    it('Michael walks free, realocating his former soldiers', function() {
      Corleone.setFree(Michael);
      Michael.isFree().should.be.true;

      Vincent.getBoss().should.equal(Michael);
    });
  });

  describe('Family muscle', function() {
    var Fredo;
    var Genco;
    it('should return the muscle of the family', function(){
      Corleone.getMuscle(Vito).should.equal(4);
    });

    it('Adding new members, Incrising our muscle', function(){
      Fredo = new Member('Frederico', 'Fredo', Michael);
      Genco = new Member('Genco', 'Genco', Vito)

      Corleone.getMuscle(Vito).should.equal(6);
      Corleone.getMuscle(Michael).should.equal(2);
    });

    it('bastards!, we had some casualties', function(){
      Michael.removeSoldier(Fredo);
      Corleone.getMuscle(Michael).should.equal(1);
      Vito.removeSoldier(Genco);
      Corleone.getMuscle(Vito).should.equal(4);
    });

    it('again, Michael is back to jail', function(){
      Corleone.setInJail(Michael);
      Corleone.getMuscle(Vito).should.equal(3);
    });

    it('Tom makes Michael walks free again', function(){
      Corleone.setFree(Michael);
      Corleone.getMuscle(Vito).should.equal(4);
    });
  });

  describe('Jail and Freedom with no older', function(){

    it('Remove some soldiers', function(){
      Vito.removeSoldier(Sonny);
      Vito.removeSoldier(Tom);
      Corleone.getMuscle(Vito).should.equal(2)
    });

    it('Michael get some soldiers', function(){
      var Fredo = new Member('Frederico', 'Fredo', Michael);
      var Genco = new Member('Genco', 'Genco', Michael)
      Corleone.getMuscle(Vito).should.equal(4)
      Corleone.getMuscle(Michael).should.equal(3);
    });

    it('Michael loves jail', function(){
      Corleone.setInJail(Michael);
      Michael.isFree().should.be.false;
      Corleone.getMuscle(Michael).should.equal(0);
      Corleone.getMuscle(Vito).should.equal(3);
      Corleone.getMuscle(Vincent).should.equal(2);
    });

    it('Tom Hagen proves his value, Michael free', function(){
      Corleone.setFree(Michael);
      Michael.isFree().should.be.true;
      Corleone.getMuscle(Michael).should.equal(3);
      Corleone.getMuscle(Vito).should.equal(4);
      Corleone.getMuscle(Vincent).should.equal(0);
    });
  });

});