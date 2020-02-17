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

//traverse/access/touch
//do all of the steps in my head THEN: identify pattern: do this pattern in a loop OR a recursive call
Node.prototype.traverse = function(func = console.log) {
  func(this.letter);
  Object.values(this.children).forEach(child => child.traverse());
};

Trie.prototype.traverse = function(func = console.log) {
  this.root.traverse(func);
};

Trie.prototype.contains = function(searchTerm) {
  //try using traverse here
};

Trie.prototype.getOneWord = function(letter) {
  let word = '';
  let node = this.root;
  while (node !== undefined) {
    if (node.complete) {
      return word;
    }
    word += node.letter;
    node = node.children[letter];
    console.log(node);
  }
  console.log(word);
};

Trie.prototype.findAllWords = function() {
  // //return an array with complete words
  // let allWords = {};
  // //each property of allWords will be the root node's children
  // let fullWord = '';
  // let currentNode = this.root;
  // Object.keys(this.root.children).forEach(child => {
  //   allWords[child] = [];
  // });
  // //1. push the current node's letter into a fullWord string
  // function makeWord(currentNode, letter) {
  //   Object.entries(currentNode).forEach(node => {
  //     console.log(node[0]);
  //     fullWord += node[0];
  //     if (node[1].complete) {
  //       allWords[letter].push(fullWord);
  //       fullWord = '';
  //     } else if (node[1].children) {
  //       console.log(currentNode);
  //       makeWord(node[1].children, 't');
  //     }
  //   });
  // }
  // for (let char in allWords) {
  //   // console.log({
  //   //   current: currentNode.children,
  //   //   char: char,
  //   //   checking: currentNode.children[char]
  //   // });
  //   makeWord(currentNode.children, char);
  // }
  // console.log(allWords);
  // let letterVal = current[char];
  //2. check the node's complete property
  //a word is complete if it has a 'complete' property equal to true
  //3. if complete is true, push that word into that property's result array
  //4. if that node also has children, repeat this process
  //5. if it does not have children, move on to the next property in allWords(root node's next child)
  //6. if complete is false, move on to that node's children and repeat these steps
  let words = [];
  let search = function(node, string) {
    if (node.children) {
      for (let letter in node.children) {
        search(node.children[letter], string.concat(letter));
      }
      if (node.complete) {
        words.push(string);
      }
    }
  };
  search(this.root, '');
  console.log({ words });
  return words.length > 0 ? words : null;
};

Trie.prototype.findSuggestions = function(/*character or part of a word */) {
  //return all suggestions for that input
  let suggestions = {};
};

let searchFunctionality = new Trie();
searchFunctionality.addWord('apple');
searchFunctionality.addWord('application');
searchFunctionality.addWord('app');
searchFunctionality.addWord('car');
searchFunctionality.addWord('train');
searchFunctionality.addWord('travel');
searchFunctionality.getOneWord('a');
console.log(searchFunctionality.findAllWords());
// searchFunctionality.traverse();

let letterArr = ['a,b', 'b,c', 'c,d', 'a,e'];
function makeNewTrieforJosh(arr) {
  let newArr = arr.map(val => val.split(',').join(''));
  let testing = new Trie();
  newArr.forEach(val => testing.addWord(val));
  return testing;
}
// console.log(makeNewTrieforJosh(letterArr));
// console.log(searchFunctionality.findAllWords());
