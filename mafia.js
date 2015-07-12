function Mafia(name, boss) {
	this.name = name;
	this.capo = boss;
	this.important = 50;
	this.mwl = [];
};

Mafia.prototype.getName = function() {
	return this.name;
};

Mafia.prototype.getCapo = function() {
	return this.capo;
};

Mafia.prototype.setInJail = function(member) {

	member.setInJail();

	var superBoss = member.getBoss();
	var elder = superBoss.getOlderSoldier();

	if (elder === member) {
		// No soldiers, 
		// we need to promote some soldier of member
		var olderSoldier = member.getOlderSoldier();
	
		var tmp = member.soldiers.slice(0);

		tmp.splice(olderSoldier.id,1);

		member.realocatingBoss(olderSoldier);
		member.promotion = true;
		superBoss.addTmpSoldier(olderSoldier);
		olderSoldier.addTmpSoldiers(tmp);
	} else {
		member.realocatingBoss(elder);
		elder.addTmpSoldiers(member.soldiers);
	}
};

Mafia.prototype.setFree = function(member) {
	member.setInFreedom();

	if(member.promotion) {

		member.realocateBoss.tmpBoss.tmpSoldiers = [];
		member.realocateBoss.tmpBoss.muscle -= 1;

		var formers = member.soldiers;
		member.addFormerSoldiers(formers);

	} else {

		var formers = member.soldiers;
		member.addFormerSoldiers(formers);
	}
};

Mafia.prototype.getMuscle = function(member) {
	return this.countingMuscle(member);
};

Mafia.prototype.countingMuscle = function(member) {
	if (!member.isFree()) {
		return 0;
	}
	if (!member.isBoss()) {
		return 0;
	}

	var c = 0;
	for (var i in member.soldiers) {
		var t = this.countingMuscle(member.soldiers[i]);
		c += t;
		//console.log(member.soldiers[i].name + ' ' + t)
	}
	for (var i in member.tmpSoldiers) {
		var t = this.countingMuscle(member.tmpSoldiers[i]);
		c += t;
		//console.log(member.tmpSoldiers[i].name + ' ' + t)
	}

	var sum = member.muscle + c;
	if (sum >= this.important){
		this.mwl.push(member.name);
	}

	return sum;
};


Mafia.prototype.mostWanted = function() {
	this.mwl = []
	this.getMuscle(this.capo);

	return this.mwl;
};

module.exports = Mafia;