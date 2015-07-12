var chai = require('chai');
var Member = require('../member');

chai.should();

describe('Mafia members', function () {

  var Vito;
  var Sonny;
  var Michael;

  describe('Creating a Capo', function () {
    it('should create a Capo (no boss)', function () {
      Vito = new Member('Corleone', 'capo');
      Vito.isBoss().should.be.false;
    });
  });

  describe('Add/Remove some muscle', function () {
    it('should add a couple of soldiers', function () {
      Sonny = new Member('Santino', 'sonny', Vito);
      Michael = new Member('Michael', 'Michael', Vito);

      Sonny.boss.should.equal(Vito);
      Michael.boss.should.equal(Vito);

      Sonny.countSoldiers().should.equal(0);
      Michael.soldiers.should.be.empty;

      Vito.countSoldiers().should.equal(2); 
      Vito.isBoss().should.be.true;
    });

    it('should remove a soldiers', function () {
      Vito.countSoldiers().should.equal(2); 

      Vito.removeSoldier(Sonny);
      Vito.countSoldiers().should.equal(1);
    });

    it('should add a soldiers', function () {
      var Fredo = new Member('Frederico', 'Fredo');
      Fredo.isBoss().should.be.false;

      Vito.addSoldier(Fredo);
      Vito.countSoldiers().should.equal(2); 
      Fredo.isBoss().should.be.false;
    });
  });

  describe('Get Boss', function () {
    it('should get the boss', function () {
      Michael.getBoss().should.equal(Vito);
    });
  });

  describe('Checks freedom', function () {
    it('should be free', function () {
      Vito.isFree().should.be.true;
    });
  });
});