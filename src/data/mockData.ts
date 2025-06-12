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

export const mockChallenge: Challenge = {
  id: 'varsity-cup-2024',
  title: 'Varsity Code Cup 2024',
  description: 'The ultimate coding competition for South African university students. Test your algorithmic skills and compete for glory!',
  startTime: '2024-03-15T09:00:00Z',
  endTime: '2024-03-15T12:00:00Z',
  problems: mockProblems
};

// Mock validation function
export const validateSubmission = (code: string, language: string, problemId: string) => {
  // Simple mock validation - in real implementation, this would run actual tests
  const isValid = code.length > 10 && code.includes('function') || code.includes('def') || code.includes('public');
  
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