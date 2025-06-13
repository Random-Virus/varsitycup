import { Challenge, Problem } from '../types';

export const mockProblems: Problem[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    difficulty: 'Easy',
    points: 100,
    timeLimit: 1000,
    memoryLimit: 256,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]'
      },
      {
        input: 'nums = [3,3], target = 6',
        output: '[0,1]'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ]
  },
  {
    id: 'reverse-string',
    title: 'Reverse String',
    description: `Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.`,
    difficulty: 'Easy',
    points: 75,
    timeLimit: 1000,
    memoryLimit: 256,
    examples: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]'
      },
      {
        input: 's = ["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]'
      }
    ],
    constraints: [
      '1 <= s.length <= 10^5',
      's[i] is a printable ascii character.'
    ]
  },
  {
    id: 'palindrome-number',
    title: 'Palindrome Number',
    description: `Given an integer x, return true if x is palindrome integer.

An integer is a palindrome when it reads the same backward as forward.`,
    difficulty: 'Easy',
    points: 80,
    timeLimit: 1000,
    memoryLimit: 256,
    examples: [
      {
        input: 'x = 121',
        output: 'true',
        explanation: '121 reads as 121 from left to right and from right to left.'
      },
      {
        input: 'x = -121',
        output: 'false',
        explanation: 'From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.'
      },
      {
        input: 'x = 10',
        output: 'false',
        explanation: 'Reads 01 from right to left. Therefore it is not a palindrome.'
      }
    ],
    constraints: [
      '-2^31 <= x <= 2^31 - 1'
    ]
  },
  {
    id: 'fibonacci-sequence',
    title: 'Fibonacci Number',
    description: `The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1.

Given n, calculate F(n).`,
    difficulty: 'Easy',
    points: 90,
    timeLimit: 1000,
    memoryLimit: 256,
    examples: [
      {
        input: 'n = 2',
        output: '1',
        explanation: 'F(2) = F(1) + F(0) = 1 + 0 = 1.'
      },
      {
        input: 'n = 3',
        output: '2',
        explanation: 'F(3) = F(2) + F(1) = 1 + 1 = 2.'
      },
      {
        input: 'n = 4',
        output: '3',
        explanation: 'F(4) = F(3) + F(2) = 2 + 1 = 3.'
      }
    ],
    constraints: [
      '0 <= n <= 30'
    ]
  }
];

// CRYPTOGRAPHY CHALLENGES - Separate category
export const cryptographyProblems: Problem[] = [
  {
    id: 'caesar-cipher-cracker',
    title: 'Caesar Cipher Cracker',
    description: `A Caesar cipher is a simple substitution cipher where each letter is shifted by a fixed number of positions in the alphabet.

Given an encrypted message using a Caesar cipher, implement a function to crack the cipher by trying all possible shifts (0-25) and return the most likely decrypted message.

The most likely message is the one that contains the most common English words like "THE", "AND", "FOR", "ARE", "BUT", "NOT", "YOU", "ALL", "CAN", "HER", "WAS", "ONE", "OUR", "HAD", "DAY".

Return the decrypted message with the highest word match score.`,
    difficulty: 'Medium',
    points: 150,
    timeLimit: 2000,
    memoryLimit: 256,
    examples: [
      {
        input: 'encrypted = "WKH TXLFN EURZQ IRA"',
        output: '"THE QUICK BROWN FOX"',
        explanation: 'Shift of 3 produces the most recognizable English text.'
      },
      {
        input: 'encrypted = "KHOOR ZRUOG"',
        output: '"HELLO WORLD"',
        explanation: 'Shift of 3 decrypts to common English phrase.'
      }
    ],
    constraints: [
      '1 <= encrypted.length <= 1000',
      'Input contains only uppercase letters and spaces',
      'At least one valid English word will be present in the correct decryption'
    ]
  },
  {
    id: 'password-strength-analyzer',
    title: 'Password Strength Analyzer',
    description: `Implement a password strength analyzer that evaluates passwords based on multiple security criteria.

The analyzer should return a strength score (0-100) and classification:
- 0-25: Very Weak
- 26-50: Weak  
- 51-75: Medium
- 76-90: Strong
- 91-100: Very Strong

Scoring criteria:
- Length: +2 points per character (minimum 8 for any points)
- Uppercase letters: +5 points if present
- Lowercase letters: +5 points if present  
- Numbers: +5 points if present
- Special characters (!@#$%^&*): +10 points if present
- No common patterns: +15 points (no "123", "abc", "password", etc.)
- No repeated characters (3+ in a row): +10 points

Return both the score and the classification string.`,
    difficulty: 'Medium',
    points: 140,
    timeLimit: 1500,
    memoryLimit: 256,
    examples: [
      {
        input: 'password = "Password123!"',
        output: '{"score": 67, "classification": "Medium"}',
        explanation: 'Length(24) + Upper(5) + Lower(5) + Numbers(5) + Special(10) + NoCommon(15) + NoRepeated(10) = 74, but capped due to common word.'
      },
      {
        input: 'password = "p@ssW0rd"',
        output: '{"score": 51, "classification": "Medium"}',
        explanation: 'Contains common pattern "password" which reduces score.'
      },
      {
        input: 'password = "MyS3cur3P@ssw0rd!"',
        output: '{"score": 89, "classification": "Strong"}',
        explanation: 'Strong password meeting most criteria.'
      }
    ],
    constraints: [
      '1 <= password.length <= 128',
      'Password contains only ASCII printable characters'
    ]
  },
  {
    id: 'simple-rsa-keygen',
    title: 'Simple RSA Key Generator',
    description: `Implement a simplified RSA key generation algorithm for educational purposes.

Given two small prime numbers p and q, generate the RSA public and private key components:

1. Calculate n = p * q
2. Calculate φ(n) = (p-1) * (q-1) (Euler's totient function)
3. Choose e = 65537 (common public exponent)
4. Calculate d such that (e * d) mod φ(n) = 1 (modular multiplicative inverse)

Return the public key (n, e) and private key (n, d) as a JSON object.

Note: This is a simplified version for learning. Real RSA uses much larger primes.`,
    difficulty: 'Hard',
    points: 200,
    timeLimit: 3000,
    memoryLimit: 256,
    examples: [
      {
        input: 'p = 61, q = 53',
        output: '{"public": {"n": 3233, "e": 65537}, "private": {"n": 3233, "d": 413}}',
        explanation: 'n = 61*53 = 3233, φ(n) = 60*52 = 3120, d is modular inverse of e mod φ(n)'
      },
      {
        input: 'p = 17, q = 19',
        output: '{"public": {"n": 323, "e": 65537}, "private": {"n": 323, "d": 65537}}',
        explanation: 'For small primes, e might equal d when φ(n) is small.'
      }
    ],
    constraints: [
      'p and q are prime numbers',
      '10 <= p, q <= 100',
      'p != q',
      'gcd(e, φ(n)) = 1 (e and φ(n) are coprime)'
    ]
  },
  {
    id: 'hash-collision-finder',
    title: 'Hash Collision Finder',
    description: `Implement a simplified hash collision finder for educational purposes.

Given a simple hash function that takes a string and returns hash(s) = (sum of ASCII values * 31^i) mod 1000, find two different strings that produce the same hash value.

The hash function: hash(s) = (s[0]*31^0 + s[1]*31^1 + s[2]*31^2 + ...) mod 1000

Find any two different strings of length 3 that have the same hash value. Return them as an array of two strings.

Note: This is a deliberately weak hash function for educational purposes to demonstrate collision vulnerabilities.`,
    difficulty: 'Hard',
    points: 180,
    timeLimit: 5000,
    memoryLimit: 256,
    examples: [
      {
        input: 'target_length = 3',
        output: '["abc", "xyz"]',
        explanation: 'Two different 3-character strings that produce the same hash value.'
      },
      {
        input: 'target_length = 3',
        output: '["aaa", "bcd"]',
        explanation: 'Another example of collision - different strings, same hash.'
      }
    ],
    constraints: [
      'Strings must be exactly 3 characters long',
      'Use only lowercase letters a-z',
      'The two strings must be different',
      'Both strings must produce the same hash value'
    ]
  }
];

// DATA STRUCTURES CHALLENGES - New category
export const dataStructuresProblems: Problem[] = [
  {
    id: 'stack-simulator',
    title: 'Stack Simulator',
    description: `Implement a browser's back/forward functionality using a stack-based approach.

Create a BrowserHistory class that simulates web browser navigation:

1. BrowserHistory(homepage) - Initialize with homepage
2. visit(url) - Visit a new URL (clears forward history)
3. back(steps) - Go back 'steps' in history, return current URL
4. forward(steps) - Go forward 'steps' in history, return current URL

The browser should maintain separate stacks for back and forward history, and handle edge cases where there aren't enough pages to navigate.

Return the current URL after each back/forward operation.`,
    difficulty: 'Medium',
    points: 160,
    timeLimit: 2000,
    memoryLimit: 256,
    examples: [
      {
        input: 'BrowserHistory("google.com"); visit("facebook.com"); visit("youtube.com"); back(1); forward(1);',
        output: '["facebook.com", "youtube.com"]',
        explanation: 'Navigate back to facebook.com, then forward to youtube.com'
      },
      {
        input: 'BrowserHistory("home.com"); visit("page1.com"); back(2); visit("page2.com");',
        output: '["home.com", "page2.com"]',
        explanation: 'Back 2 steps goes to home.com, visiting page2.com clears forward history'
      }
    ],
    constraints: [
      '1 <= homepage.length <= 20',
      '1 <= url.length <= 20',
      '1 <= steps <= 100',
      'At most 5000 calls will be made to visit, back, and forward'
    ]
  },
  {
    id: 'custom-linked-list',
    title: 'Custom Linked List',
    description: `Implement your own doubly linked list with the following operations:

Create a DoublyLinkedList class with these methods:
1. insertFront(val) - Insert at the beginning
2. insertLast(val) - Insert at the end  
3. insertAtIndex(index, val) - Insert at specific index
4. deleteFront() - Delete first node
5. deleteLast() - Delete last node
6. deleteAtIndex(index) - Delete at specific index
7. get(index) - Get value at index
8. size() - Return list size
9. toArray() - Return array representation

Handle edge cases like empty lists, invalid indices, and maintain proper forward/backward links.

Return the final array representation after all operations.`,
    difficulty: 'Medium',
    points: 170,
    timeLimit: 2500,
    memoryLimit: 256,
    examples: [
      {
        input: 'insertFront(1); insertLast(3); insertAtIndex(1, 2); toArray();',
        output: '[1, 2, 3]',
        explanation: 'Insert 1 at front, 3 at end, 2 at index 1'
      },
      {
        input: 'insertLast(1); insertLast(2); deleteFront(); insertFront(0); toArray();',
        output: '[0, 2]',
        explanation: 'Build [1,2], delete front to get [2], insert 0 at front to get [0,2]'
      }
    ],
    constraints: [
      '0 <= val <= 1000',
      '0 <= index <= list.size()',
      'At most 1000 operations will be performed',
      'All operations should run in O(1) or O(n) time'
    ]
  },
  {
    id: 'priority-queue-battles',
    title: 'Priority Queue Battles',
    description: `Manage customer queues with varying priority levels using a priority queue system.

Implement a CustomerQueue class that handles customers with different priority levels:

1. addCustomer(name, priority) - Add customer with priority (1=highest, 5=lowest)
2. serveNext() - Serve the highest priority customer (FIFO for same priority)
3. changePriority(name, newPriority) - Update customer's priority
4. getQueueStatus() - Return array of customers in serving order
5. estimateWaitTime(name) - Return position in queue (0-based)

Priority rules:
- Lower numbers = higher priority (1 > 2 > 3 > 4 > 5)
- Same priority customers are served FIFO
- VIP customers (priority 1) always go first

Return the queue status after each operation.`,
    difficulty: 'Hard',
    points: 190,
    timeLimit: 3000,
    memoryLimit: 256,
    examples: [
      {
        input: 'addCustomer("Alice", 3); addCustomer("Bob", 1); addCustomer("Charlie", 3); serveNext();',
        output: '["Alice", "Charlie"]',
        explanation: 'Bob (priority 1) is served first, leaving Alice and Charlie (both priority 3)'
      },
      {
        input: 'addCustomer("John", 2); addCustomer("Jane", 4); changePriority("Jane", 1); getQueueStatus();',
        output: '["Jane", "John"]',
        explanation: 'Jane\'s priority changed from 4 to 1, moving her to front'
      }
    ],
    constraints: [
      '1 <= name.length <= 20',
      '1 <= priority <= 5',
      'Customer names are unique',
      'At most 1000 operations will be performed'
    ]
  },
  {
    id: 'lru-cache-implementation',
    title: 'LRU Cache Implementation',
    description: `Design and implement a Least Recently Used (LRU) cache data structure.

Implement the LRUCache class:
1. LRUCache(capacity) - Initialize with positive capacity
2. get(key) - Return value if key exists, otherwise return -1. Mark as recently used.
3. put(key, value) - Update value if key exists, otherwise add key-value pair. Mark as recently used.
4. If cache exceeds capacity, evict the least recently used item first.

The cache should support O(1) average time complexity for both get and put operations.

Use a combination of HashMap and Doubly Linked List for optimal performance.

Return the cache state after each operation for testing.`,
    difficulty: 'Hard',
    points: 200,
    timeLimit: 3000,
    memoryLimit: 256,
    examples: [
      {
        input: 'LRUCache(2); put(1, 1); put(2, 2); get(1); put(3, 3); get(2);',
        output: '[1, -1]',
        explanation: 'Cache capacity 2. After put(3,3), key 2 is evicted. get(2) returns -1.'
      },
      {
        input: 'LRUCache(2); put(1, 1); put(2, 2); put(1, 10); get(1); get(2);',
        output: '[10, 2]',
        explanation: 'Update key 1 to value 10, then get both values'
      }
    ],
    constraints: [
      '1 <= capacity <= 3000',
      '0 <= key <= 10^4',
      '0 <= value <= 10^5',
      'At most 2 * 10^4 calls will be made to get and put'
    ]
  }
];

export const mockChallenge: Challenge = {
  id: 'varsity-cup-2024',
  title: 'Varsity Code Cup 2024',
  description: 'The ultimate coding competition for South African university students. Test your algorithmic skills, problem-solving abilities, and cybersecurity knowledge across multiple distinct challenge categories!',
  startTime: '2024-03-15T09:00:00Z',
  endTime: '2024-03-15T12:00:00Z',
  problems: mockProblems
};

export const cryptographyChallenge: Challenge = {
  id: 'cryptography-challenges-2024',
  title: 'Cryptography Challenges',
  description: 'Specialized cybersecurity and cryptography challenges designed to test your knowledge of encryption, security analysis, and cryptographic algorithms.',
  startTime: '2024-03-15T09:00:00Z',
  endTime: '2024-03-15T12:00:00Z',
  problems: cryptographyProblems
};

export const dataStructuresChallenge: Challenge = {
  id: 'data-structures-challenges-2024',
  title: 'Data Structures Challenges',
  description: 'Advanced data structure implementation challenges focusing on stacks, queues, linked lists, and cache systems with real-world applications.',
  startTime: '2024-03-15T09:00:00Z',
  endTime: '2024-03-15T12:00:00Z',
  problems: dataStructuresProblems
};

// Mock validation function
export const validateSubmission = (code: string, language: string, problemId: string) => {
  // Simple mock validation - in real implementation, this would run actual tests
  const isValid = code.length > 10 && (code.includes('function') || code.includes('def') || code.includes('public') || code.includes('class'));
  
  // Special validation for cryptography challenges
  if (problemId === 'caesar-cipher-cracker') {
    const hasShiftLogic = code.includes('shift') || code.includes('decrypt') || code.includes('cipher');
    return {
      status: (isValid && hasShiftLogic) ? 'Accepted' : 'Wrong Answer' as const,
      testResults: {
        passed: (isValid && hasShiftLogic) ? 3 : 1,
        total: 3,
        details: (isValid && hasShiftLogic)
          ? ['Test case 1: Passed', 'Test case 2: Passed', 'Test case 3: Passed']
          : ['Test case 1: Failed - Missing cipher logic', 'Test case 2: Passed', 'Test case 3: Failed']
      }
    };
  }
  
  if (problemId === 'password-strength-analyzer') {
    const hasScoring = code.includes('score') || code.includes('strength') || code.includes('classification');
    return {
      status: (isValid && hasScoring) ? 'Accepted' : 'Wrong Answer' as const,
      testResults: {
        passed: (isValid && hasScoring) ? 3 : 1,
        total: 3,
        details: (isValid && hasScoring)
          ? ['Test case 1: Passed', 'Test case 2: Passed', 'Test case 3: Passed']
          : ['Test case 1: Failed - Missing scoring logic', 'Test case 2: Passed', 'Test case 3: Failed']
      }
    };
  }
  
  if (problemId === 'simple-rsa-keygen') {
    const hasRSALogic = code.includes('rsa') || code.includes('modular') || code.includes('inverse') || code.includes('totient');
    return {
      status: (isValid && hasRSALogic) ? 'Accepted' : 'Wrong Answer' as const,
      testResults: {
        passed: (isValid && hasRSALogic) ? 3 : 1,
        total: 3,
        details: (isValid && hasRSALogic)
          ? ['Test case 1: Passed', 'Test case 2: Passed', 'Test case 3: Passed']
          : ['Test case 1: Failed - Missing RSA logic', 'Test case 2: Passed', 'Test case 3: Failed']
      }
    };
  }
  
  if (problemId === 'hash-collision-finder') {
    const hasHashLogic = code.includes('hash') || code.includes('collision') || code.includes('mod');
    return {
      status: (isValid && hasHashLogic) ? 'Accepted' : 'Wrong Answer' as const,
      testResults: {
        passed: (isValid && hasHashLogic) ? 3 : 1,
        total: 3,
        details: (isValid && hasHashLogic)
          ? ['Test case 1: Passed', 'Test case 2: Passed', 'Test case 3: Passed']
          : ['Test case 1: Failed - Missing hash logic', 'Test case 2: Passed', 'Test case 3: Failed']
      }
    };
  }

  // Special validation for data structures challenges
  if (problemId === 'stack-simulator') {
    const hasStackLogic = code.includes('stack') || code.includes('push') || code.includes('pop') || code.includes('browser');
    return {
      status: (isValid && hasStackLogic) ? 'Accepted' : 'Wrong Answer' as const,
      testResults: {
        passed: (isValid && hasStackLogic) ? 3 : 1,
        total: 3,
        details: (isValid && hasStackLogic)
          ? ['Test case 1: Passed', 'Test case 2: Passed', 'Test case 3: Passed']
          : ['Test case 1: Failed - Missing stack logic', 'Test case 2: Passed', 'Test case 3: Failed']
      }
    };
  }

  if (problemId === 'custom-linked-list') {
    const hasLinkedListLogic = code.includes('linked') || code.includes('node') || code.includes('next') || code.includes('prev');
    return {
      status: (isValid && hasLinkedListLogic) ? 'Accepted' : 'Wrong Answer' as const,
      testResults: {
        passed: (isValid && hasLinkedListLogic) ? 3 : 1,
        total: 3,
        details: (isValid && hasLinkedListLogic)
          ? ['Test case 1: Passed', 'Test case 2: Passed', 'Test case 3: Passed']
          : ['Test case 1: Failed - Missing linked list logic', 'Test case 2: Passed', 'Test case 3: Failed']
      }
    };
  }

  if (problemId === 'priority-queue-battles') {
    const hasPriorityLogic = code.includes('priority') || code.includes('queue') || code.includes('heap') || code.includes('customer');
    return {
      status: (isValid && hasPriorityLogic) ? 'Accepted' : 'Wrong Answer' as const,
      testResults: {
        passed: (isValid && hasPriorityLogic) ? 3 : 1,
        total: 3,
        details: (isValid && hasPriorityLogic)
          ? ['Test case 1: Passed', 'Test case 2: Passed', 'Test case 3: Passed']
          : ['Test case 1: Failed - Missing priority queue logic', 'Test case 2: Passed', 'Test case 3: Failed']
      }
    };
  }

  if (problemId === 'lru-cache-implementation') {
    const hasLRULogic = code.includes('lru') || code.includes('cache') || code.includes('least') || code.includes('recently');
    return {
      status: (isValid && hasLRULogic) ? 'Accepted' : 'Wrong Answer' as const,
      testResults: {
        passed: (isValid && hasLRULogic) ? 3 : 1,
        total: 3,
        details: (isValid && hasLRULogic)
          ? ['Test case 1: Passed', 'Test case 2: Passed', 'Test case 3: Passed']
          : ['Test case 1: Failed - Missing LRU cache logic', 'Test case 2: Passed', 'Test case 3: Failed']
      }
    };
  }
  
  return {
    status: isValid ? 'Accepted' : 'Wrong Answer' as const,
    testResults: {
      passed: isValid ? 3 : 1,
      total: 3,
      details: isValid 
        ? ['Test case 1: Passed', 'Test case 2: Passed', 'Test case 3: Passed']
        : ['Test case 1: Failed', 'Test case 2: Passed', 'Test case 3: Failed']
    }
  };
};