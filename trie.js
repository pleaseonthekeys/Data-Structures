//implement a trie data structure with methods: addWord, traverse, findAllWords, and findSuggestions. Create a Trie (prefix tree) from the input: ['a,b', 'b,c', 'c,d', 'a,e']

function Node(letter, complete) {
  this.letter = letter;
  this.children = {};
  this.complete = complete;
}

function Trie() {
  this.root = new Node('', false);
}

Trie.prototype.addWord = function(word) {
  let currentNode = this.root;
  for (let i = 0; i < word.length; i++) {
    let char = word[i];
    let isCompelted = i === word.length - 1;
    let matchedLetterNode = currentNode.children[char];
    if (matchedLetterNode) {
      currentNode = matchedLetterNode;
      if (isCompelted) {
        currentNode.complete = true;
      }
    } else {
      let newLetter = new Node(char, isCompelted);
      currentNode.children[char] = newLetter;
      currentNode = newLetter;
    }
  }
};

Node.prototype.traverse = function(func = console.log) {
  func(this);
  Object.values(this.children).forEach(child => child.traverse());
};

Trie.prototype.traverse = function(func = console.log) {
  this.root.traverse();
};

Trie.prototype.findAllWords = function() {
  let words = [];
  let search = function(node, string) {
    if (node.children) {
      for (let letter in node.children) {
        search(node.children[letter], string + letter);
      }
      if (node.complete) {
        words.push(string);
      }
    }
  };
  search(this.root, '');
  return words.length > 0 ? words : null;
};

let searchFunctionality = new Trie();
searchFunctionality.addWord('apple');
searchFunctionality.addWord('application');
searchFunctionality.addWord('app');
searchFunctionality.addWord('car');
searchFunctionality.addWord('train');
searchFunctionality.addWord('travel');
searchFunctionality.findAllWords();
searchFunctionality.findSuggestions('a');

let letterArr = ['a,b', 'b,c', 'c,d', 'a,e'];
function makeNewTrieforJosh(arr) {
  let newArr = arr.map(val => val.split(',').join(''));
  let testing = new Trie();
  newArr.forEach(val => testing.addWord(val));
  return testing;
}

let newTrie = makeNewTrieforJosh(letterArr);
console.log(newTrie);
console.log(newTrie.findAllWords());
