import { createHash } from "crypto";

import prologue from "./prologue.sh";

import centos from "./os/centos.sh";
import debian from "./os/debian.sh";
import osx from "./os/osx.sh";
import redhat from "./os/redhat.sh";
import suse from "./os/suse.sh";
import ubuntu from "./os/ubuntu.sh";

import npm from "./pkg/npm.sh";

import epilogue from "./epilogue.sh";

export type ScannerOptions = {
  ingestUrl: string;
};

function replaceVars(template: string, options: ScannerOptions) {
  // replace template variables in the format {{VAR_NAME}}
  return template.replace(/\{\{([a-z0-9]+)\}\}/gi, (_, varName: string) => {
    if (varName in options) {
      // @ts-expect-error
      return options[varName];
    } else {
      throw new Error(`Missing required option '${varName}'`);
    }
  });
}

export function scanner(options: ScannerOptions) {
  const template = [
    prologue,
    centos,
    debian,
    osx,
    redhat,
    suse,
    ubuntu,

    npm,

    epilogue,
  ].map((t) => replaceVars(t, options));

  const scanner = template.join("\n\n");
  const hash = createHash("sha512").update(scanner).digest("hex");

  return {
    scanner,
    hash,
  };
}
