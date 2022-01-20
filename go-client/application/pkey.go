package main

import (
	"fmt"
	"os"
)

func main() {
	privateKey := os.Getenv("PRIVATE_KEY")
	fmt.Println(privateKey)
}