/** @param {NS} ns **/

export async function main(ns) {
  var delta = "\
\n\
                                . \n\
                               (((\n\
                              (((((\n\
                              ((((((&\n\
                             ((& ((((((\n\
                            ((&*   ((((&\n\
                            ((&     (((((&\n\
                           ((# O    O  ((((&\n\
                           ((            ((((&\n\
                          ((&  \\____/    ((((%\n\
                         ((&               ((((&\n\
                         (#&      (((((((((((%&%@@@@@\n\
                        ((((((%&%           @%////////@@\n\
                      @ @//@@@&     @@@@@///////////////@\n\
                     @@//////////////////////////////////@\n\
                      @/////////////////////////##@///////@\n\
                     @///////////////////////////##@///////@\n\
                     @////////////////////////////##@//////%@\n\
                     @///////@/////////////////////###///////@\n\
                     @////////@////////////////////(#@///////@\n\
                     @////////@/////////////////////##@//////(@\n\
                     /////////@//////////////////////#@//////(@\n\
                     //////////@/////////////////////##@/////#@\n\
                      @/////////@/////////////////////##@/////@\n\
                       @////////@@/////////////////////#@/////@\n\
                        @/////////@///////////////////##@%/(@@\n\
                        %@////////((/////////////////##@@####@\n\
                         (@///////@@////////(@@%((((((((&##%@@@\n\
                             @@@@##@@&(((((((((((((((((((@&####\n\
---------------------------------------------------------------------------------------\n\
                          DeltaDev's Auto-Growing Worm Virus\n\
                          Nicknamed 'SWorm':'Spreading Worm'\n\
                                           V1.3";
  ns.tprint(delta);

  var host = ns.getHostname();

  var servers = 
  [
    "WormServer1", "n00dles", "nectar-net", "silver-helix", "the-hub", "computek", "summit-uni", "rho-construction", "aerocorp", "omnia",
     "defcomm", "unitalife", "zeus-med", "infocomm", "zb-def", "I.I.I.I", "netlink", "rothman-uni", "lexo-corp", "global-pharm",
    "crush-fitness", "catalyst", "alpha-ent", "galactic-cyber", "deltaone", "icarus", "taiyang-digital", "univ-energy", "solaris",
     "nova-med", "snap-fitness", "millenium-fitness", "foodnstuff", "zer0", "phantasy", "johnson-ortho", "zb-institute", "omega-net", "max-hardware", "CSEC",
    "neo-net", "avmnite-02h", "syscore", "aevum-police", "sigma-cosmetics", "joesguns", "hong-fang-tea", "harakiri-sushi", "iron-gym"
  ]; //end

  var portPrgms = ["BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPWorm.exe", "SQLInject.exe"];

  var ram = 0;
  var cost = 0;
  var threads = 0;
  var maxRam;
  var usedRam;

  var scriptname = ns.getScriptName();

  if (host == "home") {
    ns.tail(scriptname);
  }

  ns.tprint("Weakening, Growing, and Hacking available servers as needed.");

  while (true) {
    for (var i = 0; i < servers.length; i++) {
      if (servers[i] != "home") {
        //if (!ns.fileExists(scriptname)) {
        await ns.scp(scriptname, servers[i]);
        ns.print("\n\nCopied SWorm to " + servers[i]);
        //}
        maxRam = ns.getServerMaxRam(servers[i]);
        usedRam = ns.getServerUsedRam(servers[i]);
        ram = (maxRam - usedRam);
        cost = ns.getScriptRam(scriptname);
        threads = Math.floor(ram / cost);

        ns.print("ram: " + ram + "\ncost: " + cost + "  threads: " + threads);

        if (threads > 0) {
          //if (!ns.scriptRunning(scriptname, servers[i])) {
          ns.exec(scriptname, servers[i], threads);
          ns.print("\n\nRunning SWorm on " + servers[i]);
          //}
        } else {
          await ns.scp("generalScript.js", servers[i]);
          ns.exec("generalScript.js", servers[i]);
        }

        var moneyThresh = ns.getServerMaxMoney(servers[i]) * 0.8;
        var securityThresh = ns.getServerSecurityLevel(servers[i]) / 2;

        if (securityThresh < ns.getServerMinSecurityLevel(servers[i])) {
          securityThresh = ns.getServerMinSecurityLevel(servers[i]);
        }
        var portsopened = 0;

        if (ns.fileExists(portPrgms[0])) {
          ns.brutessh(servers[i]);
          portsopened++;
          ns.print("brutessh " + servers[i])
        }

        if (ns.fileExists(portPrgms[1])) {
          ns.ftpcrack(servers[i]);
          portsopened++;
          ns.print("ftpcrack " + servers[i])
        }

        if (ns.fileExists(portPrgms[2])) {
          ns.relaysmtp(servers[i]);
          portsopened++;
          ns.print("relaysmtp " + servers[i])
        }

        if (ns.fileExists(portPrgms[3])) {
          ns.httpworm(servers[i]);
          portsopened++;
          ns.print("httpworm " + servers[i])
        }

        if (ns.fileExists(portPrgms[4])) {
          ns.sqlinject(servers[i]);
          portsopened++;
          ns.print("sqlinject " + servers[i])
        }

        if (ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(servers[i]) && ns.getServerNumPortsRequired(servers[i]) <= portsopened) {
          ns.nuke(servers[i]);

          if (ns.getServerSecurityLevel(servers[i]) > securityThresh) {
            ns.print(servers[i] + " minimum security level: " + ns.getServerMinSecurityLevel(servers[i]));
            await ns.weaken(servers[i]);
          } else if (ns.getServerMoneyAvailable(servers[i]) < moneyThresh) {
            await ns.grow(servers[i]);
          } else {
            await ns.hack(servers[i]);
          }
          ;
        }
      } else if (servers.length == 1 && servers[0] == "home") {
        ns.kill(scriptname, host);
      }
      await ns.sleep(50);
    }
    await ns.sleep(50);
  }
}