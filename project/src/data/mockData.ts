import { Challenge, Problem, Participant, Submission } from '../types';

export const mockProblems: Problem[] = [
  {
    id: 'p1',
    title: 'Sum of Two Numbers',
    difficulty: 'Easy',
    points: 100,
    description: `
# Sum of Two Numbers

Given an array of integers and a target sum, return the indices of two numbers such that they add up to the target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

## Constraints:
- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9
- Only one valid answer exists.
    `,
    examples: [
      {
        input: 'nums = [2, 7, 11, 15], target = 9',
        output: '[0, 1]',
      },
      {
        input: 'nums = [3, 2, 4], target = 6',
        output: '[1, 2]',
      },
    ],
    testCases: [
      {
        input: '[2, 7, 11, 15], 9',
        output: '[0, 1]',
      },
      {
        input: '[3, 2, 4], 6',
        output: '[1, 2]',
      },
      {
        input: '[3, 3], 6',
        output: '[0, 1]',
      },
    ],
  },
  {
    id: 'p2',
    title: 'Palindrome Checker',
    difficulty: 'Easy',
    points: 150,
    description: `
# Palindrome Checker

Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.

## Note:
- For the purpose of this problem, we define empty string as valid palindrome.

## Constraints:
- 1 <= s.length <= 2 * 10^5
- The string consists only of printable ASCII characters.
    `,
    examples: [
      {
        input: '"A man, a plan, a canal: Panama"',
        output: 'true',
      },
      {
        input: '"race a car"',
        output: 'false',
      },
    ],
    testCases: [
      {
        input: '"A man, a plan, a canal: Panama"',
        output: 'true',
      },
      {
        input: '"race a car"',
        output: 'false',
      },
      {
        input: '" "',
        output: 'true',
      },
    ],
  },
  {
    id: 'p3',
    title: 'Merge Intervals',
    difficulty: 'Medium',
    points: 300,
    description: `
# Merge Intervals

Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

## Constraints:
- 1 <= intervals.length <= 10^4
- intervals[i].length == 2
- 0 <= starti <= endi <= 10^4
    `,
    examples: [
      {
        input: '[[1,3],[2,6],[8,10],[15,18]]',
        output: '[[1,6],[8,10],[15,18]]',
      },
      {
        input: '[[1,4],[4,5]]',
        output: '[[1,5]]',
      },
    ],
    testCases: [
      {
        input: '[[1,3],[2,6],[8,10],[15,18]]',
        output: '[[1,6],[8,10],[15,18]]',
      },
      {
        input: '[[1,4],[4,5]]',
        output: '[[1,5]]',
      },
      {
        input: '[[1,4],[0,4]]',
        output: '[[0,4]]',
      },
    ],
  },
  {
    id: 'p4',
    title: 'LRU Cache',
    difficulty: 'Hard',
    points: 500,
    description: `
# LRU Cache

Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:
- LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
- int get(int key) Return the value of the key if the key exists, otherwise return -1.
- void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.

The functions get and put must each run in O(1) average time complexity.

## Constraints:
- 1 <= capacity <= 3000
- 0 <= key <= 10^4
- 0 <= value <= 10^5
- At most 2 * 10^5 calls will be made to get and put.
    `,
    examples: [
      {
        input: `["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]`,
        output: `[null, null, null, 1, null, -1, null, -1, 3, 4]`,
      },
    ],
    testCases: [
      {
        input: `["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]`,
        output: `[null, null, null, 1, null, -1, null, -1, 3, 4]`,
      },
      {
        input: `["LRUCache", "put", "get"]
[[1], [2, 1], [2]]`,
        output: `[null, null, 1]`,
      },
    ],
  },
];

export const mockChallenge: Challenge = {
  id: 'c1',
  title: 'South African University Coding Challenge 2025',
  description: 'Compete against the best university coders in South Africa!',
  startTime: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 24 hours from now
  endTime: new Date(Date.now() + 1000 * 60 * 60 * 27).toISOString(), // 27 hours from now
  problems: mockProblems,
};

// Function to simulate submission validation
export const validateSubmission = (code: string, language: string, problemId: string) => {
  const problem = mockProblems.find(p => p.id === problemId);
  if (!problem) {
    throw new Error('Problem not found');
  }
  
  // Simulate test results - in a real app, this would actually run the code
  const passed = Math.random() > 0.3; // 70% chance of passing
  
  const testResults = problem.testCases.map(() => ({
    passed: passed,
    message: passed ? undefined : 'Expected output does not match actual output',
  }));
  
  return {
    status: testResults.every(t => t.passed) ? 'Accepted' : 'Wrong Answer' as const,
    testResults,
  };
};