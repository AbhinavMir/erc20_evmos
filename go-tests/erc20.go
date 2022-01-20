package testERC20

import (
   "testing"
)

func TestReverseString1(t *testing.T) {
   type args struct {
      s string
   }
   tests := []struct {
      name string
      args args
      want string
   }{
      // write your test case here....
   }
   for _, tt := range tests {
      t.Run(tt.name, func(t *testing.T) {
         if got := ReverseString(tt.args.s); got != tt.want {
            t.Errorf("ReverseString() = %v, want %v", got, tt.want)
         }
      })
   }
}