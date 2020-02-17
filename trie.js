//implement a trie data structure with methods: add

function Node(letter, complete) {
  this.letter = letter;
  this.children = {};
  this.complete = complete;
}

// let example = {c: {letter:
// children:
// complete:},
// a: {letter:
// children:
// complete:},
// t: {letter:
// children:
// complete:}}

//how do we store the root node?

function Trie() {
  this.root = new Node('', false);
}

// new Trie()

Trie.prototype.addWord = function(word) {
  let currentNode = this.root;
  for (let i = 0; i < word.length; i++) {
    //a node already exist
    let char = word[i];
    let isCompelted = i === word.length - 1;
    let matchedLetterNode = currentNode.children[char];
    if (matchedLetterNode) {
      //move on to the next node
      currentNode = matchedLetterNode;
      //set compelted word condition
      if (isCompelted) {
        currentNode.complete = true;
      }
    } else {
      let newLetter = new Node(char, isCompelted);
      currentNode.children[char] = newLetter;
      //this is how we move on to the next
      currentNode = newLetter;
    }
  }
};

//actually seeing what the ptototype chain is VS. having to look inside of a class object to find methods

//traverse/access/touch
//do all of the steps in my head THEN: identify pattern: do this pattern in a loop OR a recursive call
Trie.prototype.traverse = function() {
  let current = this.root;
  //1. print letter property of the node
  //2. look at children object, see if node has children
  //3. if it does, repeat steps with each child
  console.log(current.letter);
  for (let char in current.children) {
    current = char.children;
    console.log(current.letter);
  }

  //object.entries
};

Trie.prototype.findAllWords = function() {};

Trie.prototype.findSuggestions = function(/*characater or part of a word */) {
  //return all suggestions for that input
};

let searchFunctionality = new Trie();
searchFunctionality.addWord();
