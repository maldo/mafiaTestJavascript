function Member(name, alias, boss) {
	this.name = name;
	this.alias = alias;
	this.date = Date.now();
	this.status = 'free'; //|| 'jail'
	this.soldiers = [];
	this.muscle = 0;
	this.id = undefined;

	this.promotion = false;
	this.realocateBoss;
	this.tmpBoss;
	this.tmpSoldiers = [];

	if (boss === undefined) {
		//Capo di tutto capi
	} else {
		boss.addSoldier(this);
	}
};

Member.prototype.countSoldiers = function() {
	return this.soldiers.length;
};

Member.prototype.isBoss = function() {
	return (this.soldiers.length !== 0 || this.tmpSoldiers.length !== 0) ? true:false;
}

Member.prototype.getBoss = function() {

	if (this.tmpBoss !== undefined){
		return this.tmpBoss;
	} else {
		return this.boss;
	}
}

Member.prototype.setBoss = function(boss) {
	return this.boss = boss;
}

Member.prototype.isFree = function() {
	return this.status === 'free' ? true:false;
}

Member.prototype.seniority = function() {

};

Member.prototype.addSoldier = function(soldier) {
	soldier.boss = this;
	this.soldiers.push(soldier);
	soldier.id = this.soldiers.length - 1;
	this.muscle += 1;
};

Member.prototype.removeSoldier = function(soldier) {
	this.muscle -= 1;
	this.soldiers.splice(soldier.id, 1);

	for (var i in this.soldiers) {
		this.soldiers[i].id = i;
	}
};

Member.prototype.setInJail = function() {
	this.status = 'jail';
	this.boss.muscle -= 1;
};

Member.prototype.setInFreedom = function() {
	this.status = 'free';
	this.boss.muscle += 1;
};

Member.prototype.getOlderSoldier = function() {
	var soldiers = this.soldiers;

	var older = null;
	var tmp;

	for (var i = 0; i < soldiers.length; ++i) {
    var date = soldiers[i].date;
    if (older === null || older > date) {
    	older = date;
    	tmp = i;
    };
	}
	return soldiers[tmp];
};

Member.prototype.realocatingBoss = function (member) {
	this.realocateBoss = member;
};

Member.prototype.addTmpSoldiers = function(soldiers) {
	for(var i in soldiers) {
		this.addTmpSoldier(soldiers[i]);
	}
};

Member.prototype.addTmpSoldier = function(soldier) {
	soldier.tmpBoss = this;
	this.tmpSoldiers.push(soldier);
	this.muscle += 1;
};

Member.prototype.addFormerSoldiers = function(soldiers) {

	for (var i in soldiers) {
		delete soldiers[i].tmpBoss;
	}

	if (this.promotion) {
		this.realocateBoss.muscle -= soldiers.length - 1;
	} else {
		this.realocateBoss.muscle -= soldiers.length;
	}
	this.realocateBoss.tmpSoldiers = [];
	delete this.realocateBoss;
};

module.exports = Member;