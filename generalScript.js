/** @param {NS} ns **/
export async function main(ns) {
	var target = ns.getHostname();
	var moneyThresh = (ns.getServerMaxMoney(target) * 0.8);

	while (true) {
		if (ns.getServerSecurityLevel(target) > ns.getServerMinSecurityLevel(target)) {
			await ns.weaken(target);
		} else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
			await ns.grow(target);
		} else {
			await ns.hack(target);
		}

	}
}