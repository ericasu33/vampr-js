// Who is a vampire's creator?
// How many vampires has a vampire created?
// How many vampires away from the original vampire is a vampire?
// Who is the more senior vampire out of two vampires? (Who is closer to the original vampire)
// Who is the closest common ancestor of two vampires?

// Count the total number of descendents that a vampire has
// Search for a descendant of a vampire with a specific name
// Get a list of all the of millennial descendents that a vampire has (vampires that were converted after 1980)

class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  depthFirstTraversal() {
    console.log(this.name);

    for (const child of this.offspring)
      child.depthFirstTraversal();
  }


  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.

  //https://www.geeksforgeeks.org/lowest-common-ancestor-binary-tree-set-1/
  closestCommonAncestor(vampire) {
    let current = this;
    let currentPath = [];
    let vampirePath = [];

    while (current) {
      currentPath.push(current);
      current = current.creator;
    }
    currentPath.reverse();

    while (vampire) {
      vampirePath.push(vampire);
      vampire = vampire.creator;
    }
    vampirePath.reverse();

    let i = 0;
    for (i; i < currentPath.length && i < vampirePath.length; i++) {
      //no "-1" after length because in the loop we don't want to stop at where it breaks, but rather keep on going once more.
      if (currentPath[i] !== vampirePath[i]) {
        break;
      }
    }
    return currentPath[i - 1];
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name === name) {
      return this;
    }

    for (const child of this.offspring) {
      const vampName = child.vampireWithName(name);
      if (vampName !== null) {
        return vampName;
      }
    }

    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let totalDescendents = 0;

    for (const child of this.offspring) {
      totalDescendents += 1;
      totalDescendents += child.totalDescendents;
    }
    return totalDescendents;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let convertedAfter = [];

    if (this.yearConverted > 1980) {
      convertedAfter.push(this);
    }
    
    for (const child of this.offspring) {
      const childConvertedAfter = child.allMillennialVampires;
      convertedAfter = convertedAfter.concat(childConvertedAfter);
    }
    return convertedAfter;
  }
}

const original = new Vampire("Original", 300);
  
const ansel = new Vampire("Ansel", 800);
const bart = new Vampire("Bart", 1000);

const elgort = new Vampire("Elgort", 1500);
const sarah = new Vampire("Sarah", 1600);

const andrew = new Vampire("Andrew", 2000);

original.addOffspring(ansel);
original.addOffspring(bart);
ansel.addOffspring(elgort);
ansel.addOffspring(sarah);

elgort.addOffspring(andrew);

// console.log(original.allMillennialVampires);
console.log(andrew.closestCommonAncestor(elgort));



module.exports = Vampire;

