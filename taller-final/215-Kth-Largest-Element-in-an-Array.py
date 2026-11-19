class Solution:
    def findKthLargest(self, nums, k):
        heap = []

        def sift_up(idx):
            while idx > 0:
                parent = (idx - 1) // 2
                if heap[idx] < heap[parent]:
                    heap[idx], heap[parent] = heap[parent], heap[idx]
                    idx = parent
                else:
                    break

        def sift_down(idx):
            size = len(heap)
            while True:
                left = 2 * idx + 1
                right = 2 * idx + 2
                smallest = idx

                if left < size and heap[left] < heap[smallest]:
                    smallest = left
                if right < size and heap[right] < heap[smallest]:
                    smallest = right

                if smallest != idx:
                    heap[idx], heap[smallest] = heap[smallest], heap[idx]
                    idx = smallest
                else:
                    break

        for num in nums:
            if len(heap) < k:
                heap.append(num)
                sift_up(len(heap) - 1)
            elif num > heap[0]:
                heap[0] = num
                sift_down(0)

        return heap[0]